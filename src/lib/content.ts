// All copy sourced from Brief.md. Edit here, not in components.

export const hero = {
  headline: "Learn Robotics the Right Way.",
  microSub: "Offline. Hands-on. Built on real hardware.",
  ctaPrimary: { label: "Apply for the Resident Program", href: "#apply" },
  ctaSecondary: { label: "See How It Works", href: "#program" },
};

export const program = {
  heading: "A Robotics Residency. Not a Tutorial Playlist.",
  paragraphs: [
    "The Resident Robotics Program is a fully offline, hands-on residency where you build real robots on real hardware — using ROS2, the same industry-standard stack behind Tesla, ABB, and KUKA. No pre-recorded lectures. No theory that dead-ends at an exam. You're in the lab, with the machines, from day one.",
    "And it doesn't stop at skills. A real internship is built into the program — so you walk out with proof you've done the work, not just a certificate that says you watched it. Technical depth and a career head start, in one residency. Aligned with GTU norms.",
  ],
  cta: { label: "Start Your Residency", href: "#apply" },
};

export const video = {
  heading: "See What 60 Hours in the Lab Actually Looks Like.",
  sub: "Real students. Real robots. Real builds — pressed into one short film.",
};

export const whyUs = {
  heading: "Why Learn From Us",
  cycles: [
    {
      n: "01",
      title: "Taught by Engineers Who've Felt the Pain",
      body: "70% of our team are engineers. We've sat in the lectures that taught everything except how to actually build. So we built the opposite — rigorous, practical, and led by people who've shipped real systems, not just slides.",
    },
    {
      n: "02",
      title: "Built on the Industry Standard",
      body: "You'll train on ROS2 — the real framework powering robotics at Tesla, ABB, and KUKA. Paired with high-fidelity simulation and our Simulation-to-Reality (Sim2Real) approach, you learn the exact stack the industry runs on.",
    },
    {
      n: "03",
      title: "A Real Internship, Real Hiring Partners",
      body: "The program includes a live internship and a direct line to companies hiring robotics talent — ATRI, Virtuoso, Motorama, Jenex, Homebot, and 49+ more. We don't just train you. We hand you the pipeline.",
    },
    {
      n: "04",
      title: "Backed by Names That Matter",
      body: "A Certificate of Partnership with NASSCOM IT-ITeS SSC. Member of the Nvidia Inception Program. Partnered with IBM's startup initiative. Your training carries weight before you even walk into the interview.",
    },
  ],
};

export const robots = {
  introHeading: "Four Robots. All Built In-House.",
  introBody:
    "These aren't kits off a shelf. They're designed, broken, and rebuilt on our own R&D floor — and they're the machines you'll learn on.",
  items: [
    {
      n: "01",
      name: "Campus Robot",
      tag: "Autonomous",
      headline: "From CAD to a Rolling Robot.",
      description:
        "Every chassis, mount and shell is designed, 3D-printed and assembled on our own R&D floor — the whole journey, in-house.",
      specs: [
        ["Payload", "15 kg"],
        ["Runtime", "8 hrs"],
        ["Navigation", "LiDAR + SLAM"],
        ["Top speed", "1.5 m/s"],
      ],
    },
    {
      n: "02",
      name: "T-Bot",
      tag: "Research",
      headline: "It Maps. It Plans. It Moves Itself.",
      description:
        "Real-time mapping and path planning on ROS 2, fusing LiDAR and IMU data to move safely through dynamic, unpredictable spaces.",
      specs: [
        ["Drive", "Differential"],
        ["Compute", "Jetson"],
        ["Sensors", "LiDAR + IMU"],
        ["Stack", "ROS 2"],
      ],
    },
    {
      n: "03",
      name: "Q-Bot",
      tag: "Control",
      headline: "Balance, Solved 1,000 Times a Second.",
      description:
        "Closed-loop balancing at 1 kHz — real PID and LQR control running on real hardware, not just in simulation.",
      specs: [
        ["Type", "Self-balancing"],
        ["Control", "PID + LQR"],
        ["Loop rate", "1 kHz"],
        ["Sensors", "6-axis IMU"],
      ],
    },
    {
      n: "04",
      name: "S/O Arm Manipulator",
      tag: "Industrial",
      headline: "Industrial Precision, Down to ±0.1 mm.",
      description:
        "Six degrees of freedom with ±0.1 mm repeatability for pick-and-place, assembly and inspection tasks.",
      specs: [
        ["DOF", "6"],
        ["Reach", "850 mm"],
        ["Payload", "5 kg"],
        ["Repeatability", "±0.1 mm"],
      ],
    },
  ],
};

export const curriculum = {
  heading: "What You'll Actually Build",
  overview:
    "A real robot is mechanical, electrical, and intelligent — so you'll train across all three. Equal depth, real tools, nothing skipped.",
  modules: [
    {
      n: "01",
      title: "Mechanical Design & Simulation",
      points: [
        "Robot body, chassis and manipulator design in SolidWorks",
        "Structural analysis and stress simulation in ANSYS",
        "Drivetrain design for power and precision (high-torque DC motors)",
      ],
    },
    {
      n: "02",
      title: "Electronics & Embedded Control",
      points: [
        "PCB and circuit design in KiCad",
        "The control unit — wiring the brain behind every move",
        "Sensor and actuator integration (360° LiDAR, motor systems)",
      ],
    },
    {
      n: "03",
      title: "Robotics Software, Vision & AI",
      points: [
        "ROS2 — the industry-standard robot operating system",
        "Simulation in Gazebo and the Simulation-to-Reality (Sim2Real) workflow",
        "Computer vision with OpenCV and AI-driven autonomous systems",
      ],
    },
  ],
};

export const experience = {
  heading: "Not Another Classroom. An Experience Center.",
  sub: "Where students don't take notes — they build, break, and ship.",
};

export const legacy = {
  heading: "The Numbers Behind the Name",
  stats: [
    { value: "48", suffix: "k+", label: "Mentees Enrolled", locked: true },
    { value: "1900", suffix: "+", label: "Colleges Reached · Pan India", locked: true },
    { value: "40", suffix: "+", label: "Industrial Trainings", locked: true },
    { value: "100", suffix: "+", label: "Internship Companies", locked: true },
    { value: "70", suffix: "%", label: "of our Team are Engineers", locked: true },
    { value: "49", suffix: "+", label: "Robotics Hiring Partners", locked: true },
  ],
};

export const footer = {
  heading: "Ready to Build Your Future?",
  sub: "Our onboarding team is here to help you take the next step.",
  city: "Ahmedabad",
  team: [
    { name: "Gunesh Patil", phone: "88068 06479" },
    { name: "Dhiral", phone: "87993 07628" },
  ],
  email: "partnerships@myequation.in",
  socials: ["Instagram", "LinkedIn", "Facebook", "YouTube", "Twitter"],
  tagline: "Ideation · Inspiration · Innovation",
  cta: { label: "Apply Now — Limited Seats", href: "#apply" },
};

export const nav = {
  brand: "Resident Robotics",
  links: [
    { label: "Program", href: "#program" },
    { label: "Robots", href: "#robots" },
    { label: "Curriculum", href: "#curriculum" },
    { label: "Why Us", href: "#why" },
  ],
  cta: { label: "Apply Now", href: "#apply" },
};
