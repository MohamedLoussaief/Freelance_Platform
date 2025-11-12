// src/seeds/category.seed.ts
import { AppDataSource } from "../data-source";
import { Category } from "../entities/category.entity";
import { Subcategory } from "../entities/subcategory.entity";

export async function seedCategories() {
  const categoryRepo = AppDataSource.getRepository(Category);

  const existing = await categoryRepo.count();
  if (existing > 0) return; // ✅ prevents duplicate seeding

  const categoriesData = [
    {
      name: "Development & IT",
      subcategories: [
        "Web Development",
        "Mobile App Development",
        "Game Development",
        "Blockchain & Web3",
        "AI / Machine Learning",
        "DevOps & Cloud",
        "Data Science & Data Engineering",
        "Cybersecurity",
      ],
    },
    {
      name: "Design & Creative",
      subcategories: [
        "Graphic Design",
        "UI/UX Design",
        "Web & App Design",
        "Branding & Logo Design",
        "Animation & Motion Graphics",
        "3D Modeling & Rendering",
        "Video Editing & Production",
        "Photography",
      ],
    },
    {
      name: "Writing & Translation",
      subcategories: [
        "Copywriting",
        "Content Writing & Blogging",
        "Technical Writing",
        "Resume & Cover Letters",
        "Translation & Localization",
        "Proofreading & Editing",
      ],
    },
    {
      name: "Sales & Marketing",
      subcategories: [
        "Digital Marketing",
        "SEO (Search Engine Optimization)",
        "Social Media Marketing",
        "Paid Ads (Google Ads, Facebook Ads, etc.)",
        "Email Marketing",
        "Affiliate Marketing",
        "Sales Strategy & Lead Generation",
        "Public Relations",
      ],
    },
    {
      name: "Business & Consulting",
      subcategories: [
        "Business Development",
        "Startup Consulting",
        "Project Management",
        "HR & Recruiting",
        "Financial Consulting",
        "Market Research",
        "Legal Consulting",
      ],
    },
    {
      name: "Admin & Customer Support",
      subcategories: [
        "Virtual Assistance",
        "Data Entry",
        "Customer Support (Email, Chat, Phone)",
        "Transcription",
        "Community Management",
      ],
    },
    {
      name: "Engineering & Architecture",
      subcategories: [
        "Civil Engineering",
        "Mechanical Engineering",
        "Electrical Engineering",
        "CAD Design",
        "Interior Design",
        "Architecture",
      ],
    },
    {
      name: "Education & Training",
      subcategories: [
        "Online Tutoring",
        "Language Lessons",
        "Test Preparation",
        "Course Development",
        "Corporate Training",
      ],
    },
  ];

  for (const cat of categoriesData) {
    const category = new Category();
    category.name = cat.name;

    category.subcategories = cat.subcategories.map((subName) => {
      const sub = new Subcategory();
      sub.name = subName;
      sub.category = category;
      return sub;
    });

    await categoryRepo.save(category);
  }

  console.log("✅ Categories seeded successfully!");
}
