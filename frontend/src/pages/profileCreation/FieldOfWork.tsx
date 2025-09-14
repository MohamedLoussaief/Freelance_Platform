import React, { useState } from "react";
import NavBar from "../../components/organisms/NavBar";
import StepNavigation from "../../components/molecules/StepNavigation";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CheckboxItem from "../../components/atoms/CheckboxItem";
import { motion, AnimatePresence } from "framer-motion";
import InfoBox from "../../components/atoms/InfoBox";
import CloseIcon from "@mui/icons-material/Close";

interface Subcategory {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
  subcategories: Subcategory[];
}

const FieldOfWork: React.FC = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(
    []
  );
  const [errorMsg, setErrorMsg] = useState<string | null>();

  const handleCheckboxChange = (categoryId: string, subId: string) => {
    setErrorMsg("");

    // Rule 1: Can only select from one category
    if (selectedCategory && selectedCategory !== categoryId) {
      setErrorMsg("You can only select specialties from one category.");
      return;
    }

    // Rule 2: Max 3 selections
    if (
      !selectedSubcategories.includes(subId) &&
      selectedSubcategories.length >= 3
    ) {
      setErrorMsg("You can only select up to 3 specialties.");
      return;
    }

    // Update selected category if not set
    if (!selectedCategory) {
      setSelectedCategory(categoryId);
    }

    // Toggle selection
    setSelectedSubcategories((prev) =>
      prev.includes(subId)
        ? prev.filter((id) => id !== subId)
        : [...prev, subId]
    );
  };

  const categories: Category[] = [
    {
      id: "dev_it",
      name: "Development & IT",
      subcategories: [
        {
          id: "web_dev",
          name: "Web Development (Frontend, Backend, Fullstack)",
        },
        {
          id: "mobile_dev",
          name: "Mobile App Development (iOS, Android, Cross-platform)",
        },
        { id: "game_dev", name: "Game Development" },
        { id: "blockchain", name: "Blockchain & Web3" },
        { id: "ai_ml", name: "AI / Machine Learning" },
        { id: "devops_cloud", name: "DevOps & Cloud (AWS, Azure, GCP)" },
        { id: "data_science", name: "Data Science & Data Engineering" },
        { id: "cybersecurity", name: "Cybersecurity" },
      ],
    },
    {
      id: "design_creative",
      name: "Design & Creative",
      subcategories: [
        { id: "graphic_design", name: "Graphic Design" },
        { id: "uiux", name: "UI/UX Design" },
        { id: "web_app_design", name: "Web & App Design" },
        { id: "branding", name: "Branding & Logo Design" },
        { id: "animation", name: "Animation & Motion Graphics" },
        { id: "3d_modeling", name: "3D Modeling & Rendering" },
        { id: "video_editing", name: "Video Editing & Production" },
        { id: "photography", name: "Photography" },
      ],
    },
    {
      id: "writing_translation",
      name: "Writing & Translation",
      subcategories: [
        { id: "copywriting", name: "Copywriting" },
        { id: "content_writing", name: "Content Writing & Blogging" },
        { id: "technical_writing", name: "Technical Writing" },
        { id: "resume", name: "Resume & Cover Letters" },
        { id: "translation", name: "Translation & Localization" },
        { id: "proofreading", name: "Proofreading & Editing" },
      ],
    },
    {
      id: "sales_marketing",
      name: "Sales & Marketing",
      subcategories: [
        { id: "digital_marketing", name: "Digital Marketing" },
        { id: "seo", name: "SEO (Search Engine Optimization)" },
        { id: "social_media", name: "Social Media Marketing" },
        { id: "paid_ads", name: "Paid Ads (Google Ads, Facebook Ads, etc.)" },
        { id: "email_marketing", name: "Email Marketing" },
        { id: "affiliate_marketing", name: "Affiliate Marketing" },
        { id: "sales_strategy", name: "Sales Strategy & Lead Generation" },
        { id: "pr", name: "Public Relations" },
      ],
    },
    {
      id: "business_consulting",
      name: "Business & Consulting",
      subcategories: [
        { id: "business_dev", name: "Business Development" },
        { id: "startup_consulting", name: "Startup Consulting" },
        { id: "project_management", name: "Project Management" },
        { id: "hr_recruiting", name: "HR & Recruiting" },
        { id: "financial", name: "Financial Consulting" },
        { id: "market_research", name: "Market Research" },
        { id: "legal", name: "Legal Consulting" },
      ],
    },
    {
      id: "admin_support",
      name: "Admin & Customer Support",
      subcategories: [
        { id: "virtual_assistance", name: "Virtual Assistance" },
        { id: "data_entry", name: "Data Entry" },
        {
          id: "customer_support",
          name: "Customer Support (Email, Chat, Phone)",
        },
        { id: "transcription", name: "Transcription" },
        { id: "community_management", name: "Community Management" },
      ],
    },
    {
      id: "engineering_architecture",
      name: "Engineering & Architecture",
      subcategories: [
        { id: "civil", name: "Civil Engineering" },
        { id: "mechanical", name: "Mechanical Engineering" },
        { id: "electrical", name: "Electrical Engineering" },
        { id: "cad", name: "CAD Design" },
        { id: "interior", name: "Interior Design" },
        { id: "architecture", name: "Architecture" },
      ],
    },
    {
      id: "education_training",
      name: "Education & Training",
      subcategories: [
        { id: "tutoring", name: "Online Tutoring" },
        { id: "language", name: "Language Lessons" },
        { id: "test_prep", name: "Test Preparation" },
        { id: "course_dev", name: "Course Development" },
        { id: "corporate_training", name: "Corporate Training" },
      ],
    },
  ];

  return (
    <>
      <NavBar />
      <div className="ml-3 mt-28 md:px-5">
        <h1 className="text-xl font-semibold">
          Great, so what kind of work are you here to do?
        </h1>
        <p className="mt-2">
          Don't worry, you can change these choices later on.
        </p>
        <div className="border-t border-gray-300 my-4 mr-5"></div>
        <p className="font-thin mb-5 text-sm">Select 1 category</p>

        {categories.map((category) => (
          <div key={category.id} className="mr-3 mt-5">
            {/* Category Header */}
            <div
              className="flex justify-between cursor-pointer"
              onClick={() =>
                setExpandedCategory(
                  expandedCategory === category.id ? null : category.id
                )
              }
            >
              <p> {category.name} </p>
              <KeyboardArrowDownIcon
                className={`transition-transform duration-300 ${
                  expandedCategory === category.id ? "rotate-180" : ""
                }`}
              />
            </div>
            {/* Subcategories */}
            <AnimatePresence>
              {expandedCategory === category.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden"
                >
                  <p className="font-thin mb-5 text-sm">
                    Now, select 1 to 3 specialties
                  </p>
                  <div>
                    {category.subcategories.map((sub) => (
                      <CheckboxItem
                        key={sub.id}
                        label={sub.name}
                        checked={selectedSubcategories.includes(sub.id)}
                        onChange={() =>
                          handleCheckboxChange(category.id, sub.id)
                        }
                      />
                    ))}
                  </div>
                  {errorMsg && <InfoBox message={errorMsg} />}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        {selectedSubcategories.length > 0 && (
          <>
            <div className="border-t border-gray-300 my-4 mr-5"></div>
            <div
              onClick={() => {
                setSelectedSubcategories([]);
                setSelectedCategory(null);
                setErrorMsg("");
              }}
              className="flex text-green-700 cursor-pointer items-center group mb-4 mt-5"
            >
              <CloseIcon />
              <p className="group-hover:underline">Clear selections</p>
            </div>{" "}
          </>
        )}
        <div className="mt-11 mb-2">
          <StepNavigation />
        </div>
      </div>
    </>
  );
};

export default FieldOfWork;
