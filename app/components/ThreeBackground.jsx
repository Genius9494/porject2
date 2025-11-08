"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useRef } from "react";

export default function ThreeBackground() {
  return (
    <div className="absolute top-0 left-0 w-full h-full -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        {/* إضاءة */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />

        {/* نجوم متحركة */}
        <Stars
          radius={100} // نصف قطر التوزيع
          depth={50} // العمق
          count={5000} // عدد النجوم
          factor={4} // حجم النجوم
          fade
        />

        {/* عناصر ثلاثية الأبعاد بسيطة (كرات) */}
        <SpinningSphere position={[0, 0, 0]} />
        <SpinningSphere position={[-2, 1, -3]} color="hotpink" />
        <SpinningSphere position={[2, -1, -3]} color="lightblue" />

        {/* تحكم بالكاميرا */}
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}

function SpinningSphere({ position, color = "orange" }) {
  const meshRef = useRef();

  return (
    <mesh position={position} ref={meshRef}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
