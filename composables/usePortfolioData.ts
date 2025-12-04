export const usePortfolioData = () => {
    return {
        hero: {
            title: "LonghiDev", // Note: The Win95 template had "Enigma" but user said "mantenendo i testi di base" (keeping base texts). So I should use "LonghiDev" or whatever is in the current app.vue. Current app.vue has "LonghiDev".
            subtitle: "Full-stack developer crafting modern, responsive, and performant web experiences with a retro-futuristic twist."
        },
        about: {
            title: "About Me",
            paragraphs: [
                "Hello! I'm a passionate full-stack developer with a love for creating beautiful and functional applications. My journey into code began with a fascination for 90s aesthetics and early internet culture, which I now blend with modern technologies to build unique digital experiences.",
                "With expertise in both front-end and back-end development, I thrive on tackling complex challenges and turning ideas into reality. From designing intuitive user interfaces to architecting robust server-side logic, I'm dedicated to writing clean, efficient, and scalable code. When I'm not coding, you can find me exploring vintage video games or tinkering with synthesizers."
            ]
        },
        skills: [
            "JavaScript", "React", "Node.js", "Python", "SQL",
            "TypeScript", "Next.js", "GraphQL", "Docker", "Tailwind CSS"
        ],
        projects: [
            {
                title: "Project One",
                description: "A web application that visualizes real-time data using D3.js, featuring a retro-inspired interface.",
                tags: ["React", "Node.js", "D3.js"]
            },
            {
                title: "Project Two",
                description: "An e-commerce platform with a custom CMS, built with Next.js and integrated with Stripe for payments.",
                tags: ["Next.js", "GraphQL", "PostgreSQL"]
            },
            {
                title: "Project Three",
                description: "A collaborative pixel-art editor using WebSockets for live updates and a cloud-based storage system.",
                tags: ["TypeScript", "WebSockets", "Firebase"]
            }
        ],
        contact: {
            title: "Get In Touch", // Win95 has "Contact" but current has "Get In Touch". I'll stick to current.
            text: "I'm currently open to new opportunities. Feel free to reach out via email or connect with me on social media.",
            email: "hello@example.com",
            socials: {
                github: "#",
                linkedin: "#"
            }
        }
    }
}
