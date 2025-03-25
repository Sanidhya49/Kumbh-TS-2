"use client";

import { useEffect, useRef } from "react";

export function VehicleAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const vehicles = Array.from({ length: 5 }).map((_, i) => {
      const vehicle = document.createElement("div");
      vehicle.className =
        "absolute transition-all duration-[5000ms] flex items-center justify-center"; // Increased duration to 5000ms
      vehicle.style.top = `${20 + i * 15}%`;
      vehicle.style.left = "-50px";
      vehicle.innerHTML = `<div class="bg-primary/10 dark:bg-primary/20 p-3 rounded-full"><svg class="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C1.4 11.3 1 12.1 1 13v3c0 .6.4 1 1 1h2"></path><circle cx="7" cy="17" r="2"></circle><path d="M9 17h6"></path><circle cx="17" cy="17" r="2"></circle></svg></div>`;
      container.appendChild(vehicle);
      return vehicle;
    });

    const animateVehicles = () => {
      vehicles.forEach((vehicle, i) => {
        setTimeout(() => {
          vehicle.style.left = "calc(100% + 50px)";

          setTimeout(() => {
            vehicle.style.left = "-50px";

            setTimeout(() => {
              animateVehicles();
            }, 1000);
          }, 5000); 
        }, i * 500);
      });
    };

    animateVehicles();

    return () => {
      vehicles.forEach((vehicle) => {
        vehicle.remove();
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[300px] overflow-hidden rounded-lg bg-muted/50"
    >
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-border"></div>
      <div className="absolute top-1/2 left-0 right-0 h-[1px] border-t-2 border-dashed border-muted-foreground/30"></div>
    </div>
  );
}
