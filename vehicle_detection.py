import os
# Disable file watcher for paths that include "torch" to avoid torch.classes error
os.environ["STREAMLIT_WATCHED_FILES_IGNORE"] = ".*torch.*"

import streamlit as st
import tempfile
import cv2
import torch
import numpy as np
from PIL import Image
import pathlib
import asyncio
import platform

st.title("Vehicle Detection & Counting App")
st.write("Drag and drop an image or video file for detection and object counting.")

# Ensure an asyncio event loop exists
def ensure_event_loop():
    try:
        asyncio.get_running_loop()
    except RuntimeError:
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)

# Remove caching to avoid errors with file watchers and torch's classes
def load_model():
    ensure_event_loop()
    # Windows-specific fix: use WindowsPath in place of PosixPath
    if platform.system() == "Windows":
        pathlib.PosixPath = pathlib.WindowsPath

    model_path = r"C:\Users\lenovo\OneDrive\Documents\Projects\vehicle-registration\best.pt"
    device = "cuda" if torch.cuda.is_available() else "cpu"
    # Import the YOLOv5 class from your local repo
    from yolov5 import YOLOv5
    model = YOLOv5(model_path, device=device)
    return model

# Load the model (no caching used here)
model = load_model()

def process_image(image: Image.Image):
    # Convert the uploaded PIL image to a numpy array and then to BGR format for OpenCV
    img_np = np.array(image)
    img_bgr = cv2.cvtColor(img_np, cv2.COLOR_RGB2BGR)
    
    # Run inference
    results = model.predict(img_bgr)
    
    # Render annotated image
    annotated_img = np.squeeze(results.render())
    
    # Count detections (access class names via model.model.names)
    counts = {}
    for *box, conf, cls in results.pred[0].tolist():
        label = model.model.names[int(cls)]
        counts[label] = counts.get(label, 0) + 1
        
    # Overlay counts on image
    count_text = ', '.join([f'{k}: {v}' for k, v in counts.items()])
    cv2.putText(annotated_img, count_text, (10, 30),
                cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
    
    # Convert annotated image from BGR to RGB for display in Streamlit
    annotated_img = cv2.cvtColor(annotated_img, cv2.COLOR_BGR2RGB)
    return annotated_img, counts

def process_video(input_video_path: str, output_video_path: str):
    cap = cv2.VideoCapture(input_video_path)
    if not cap.isOpened():
        st.error("Error: Could not open video.")
        return None

    frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(output_video_path, fourcc, fps, (frame_width, frame_height))
    
    total_counts = {}
    frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    st.info(f"Processing video... Total frames: {frame_count}")
    
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        
        results = model.predict(frame)
        annotated_frame = np.squeeze(results.render())
        
        counts = {}
        for *box, conf, cls in results.pred[0].tolist():
            label = model.model.names[int(cls)]
            counts[label] = counts.get(label, 0) + 1
            x1, y1, x2, y2 = map(int, box)
            cv2.rectangle(annotated_frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
            cv2.putText(annotated_frame, f'{label} {conf:.2f}', (x1, y1 - 10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
        
        # Accumulate counts over frames
        for k, v in counts.items():
            total_counts[k] = total_counts.get(k, 0) + v

        count_text = ', '.join([f'{k}: {v}' for k, v in counts.items()])
        cv2.putText(annotated_frame, count_text, (10, 30),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
        out.write(annotated_frame)
    
    cap.release()
    out.release()
    return output_video_path, total_counts

# File uploader for images or videos
uploaded_file = st.file_uploader("Choose an image or video file...", type=["jpg", "jpeg", "png", "mp4", "avi", "mov"])

if uploaded_file is not None:
    file_details = {"filename": uploaded_file.name, "filetype": uploaded_file.type}
    st.write("File details:", file_details)

    # Process image files
    if uploaded_file.type.startswith("image"):
        image = Image.open(uploaded_file).convert("RGB")
        st.image(image, caption="Uploaded Image", use_container_width=True)
        if st.button("Run Detection on Image"):
            with st.spinner("Processing image..."):
                result_img, counts = process_image(image)
                st.image(result_img, caption="Detection Results with Counts", use_container_width=True)
                st.write("Detected counts:", counts)

    # Process video files
    elif uploaded_file.type.startswith("video"):
        tfile = tempfile.NamedTemporaryFile(delete=False, suffix=".mp4")
        tfile.write(uploaded_file.read())
        st.video(tfile.name)
        
        if st.button("Run Detection on Video"):
            with st.spinner("Processing video, please wait..."):
                output_tfile = tempfile.NamedTemporaryFile(delete=False, suffix=".mp4")
                processed_video_path, total_counts = process_video(tfile.name, output_tfile.name)
                if processed_video_path is not None:
                    st.success("Video processing complete!")
                    st.video(processed_video_path)
                    st.write("Total detected counts over video:", total_counts)
                    with open(processed_video_path, "rb") as f:
                        st.download_button("Download Processed Video", f, file_name="output_video.mp4")
