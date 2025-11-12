import { In } from "typeorm";
import { AppDataSource } from "../data-source";
import { Education } from "../entities/education.entity";
import { Experience } from "../entities/experience.entity";
import { Freelancer } from "../entities/freelancer.entity";
import { Language } from "../entities/language.entity";
import { Skill } from "../entities/skill.entity";
import { Subcategory } from "../entities/subcategory.entity";
import { EducationInput } from "../graphql/inputs/education.input";
import { ExperienceInput } from "../graphql/inputs/experience.input";
import { LanguageInput } from "../graphql/inputs/language.input";
import { SkillInput } from "../graphql/inputs/skill.input";
import { SubcategoryInput } from "../graphql/inputs/subcategory.input";

const freelancerRepository = AppDataSource.getRepository(Freelancer);
const skillRepository = AppDataSource.getRepository(Skill);
const languageRepository = AppDataSource.getRepository(Language);
const educationRepository = AppDataSource.getRepository(Education);
const experienceRepository = AppDataSource.getRepository(Experience);
const subcategoryRepository = AppDataSource.getRepository(Subcategory);

export const freelancerServices = async (
  id: string,
  data: SubcategoryInput[]
) => {
  const freelancer = await freelancerRepository.findOne({
    where: { user: { id } },
    relations: ["subcategories"],
  });

  if (!freelancer) {
    throw new Error("Freelancer not found");
  }

  const subcategoryIds = data.map((sub) => sub.id);
  const subcategories = await subcategoryRepository.find({
    where: { id: In(subcategoryIds) },
  });

  const foundIds = new Set(subcategories.map((s) => s.id));
  const missing = subcategoryIds.filter((id) => !foundIds.has(id));
  if (missing.length > 0) {
    throw new Error(`Some subcategories not found`);
  }

  freelancer.subcategories = subcategories;

  await freelancerRepository.save(freelancer);
};

export const updateFreelancerInfo = async (
  id: string,
  data: { bio?: string; jobTitle?: string }
) => {
  const freelancer = await freelancerRepository.update({ user: { id } }, data);
  if (freelancer.affected === 0) {
    throw new Error("Freelancer not found");
  }
};

export const freelancerEducation = async (id: string, data: EducationInput) => {
  const freelancer = await freelancerRepository.findOne({
    where: { user: { id } },
    relations: ["educationList"],
  });

  if (!freelancer) throw new Error("Freelancer not found");

  if (data.id) {
    const education = freelancer.educationList.find((e) => e.id === data.id);
    if (!education) throw new Error("Education not found");
    Object.assign(education, data);
  } else {
    const newEducation = AppDataSource.manager.create(Education, data);
    freelancer.educationList.push(newEducation);
  }
  await freelancerRepository.save(freelancer);
};

export const freelancerExperience = async (
  id: string,
  data: ExperienceInput
) => {
  const freelancer = await freelancerRepository.findOne({
    where: { user: { id } },
    relations: ["experienceList"],
  });

  if (!freelancer) throw new Error("Freelancer not found");

  const experienceData = {
    ...data,
    startDate: new Date(data.startDate),
    endDate: data.endDate ? new Date(data.endDate) : null,
  };

  if (data.id) {
    const experience = freelancer.experienceList.find((e) => e.id === data.id);
    if (!experience) throw new Error("Experience not found");
    Object.assign(experience, experienceData);
  } else {
    const newExperience = AppDataSource.manager.create(
      Experience,
      experienceData
    );
    freelancer.experienceList.push(newExperience);
  }
  await freelancerRepository.save(freelancer);
};

export const freelancerSkills = async (id: string, data: SkillInput[]) => {
  const freelancer = await freelancerRepository.findOne({
    where: { user: { id } },
    relations: ["skills"],
  });

  if (!freelancer) throw new Error("Freelancer not found");

  const skillsToAssociate = [];

  for (const skillInput of data) {
    let skill = await skillRepository.findOne({
      where: { name: skillInput.name },
    });

    if (!skill) {
      skill = skillRepository.create(skillInput);
      await skillRepository.save(skill);
    }

    skillsToAssociate.push(skill);
  }

  freelancer.skills = skillsToAssociate;

  await freelancerRepository.save(freelancer);
};

export const freelancerLanguage = async (id: string, data: LanguageInput) => {
  const freelancer = await freelancerRepository.findOne({
    where: { user: { id } },
    relations: ["languages"],
  });

  if (!freelancer) throw new Error("Freelancer not found");

  let language = await languageRepository.findOne({
    where: { code: data.code },
  });

  if (!language) {
    language = languageRepository.create(data);
    await languageRepository.save(language);
  }

  const alreadyHasLanguage = freelancer.languages.some(
    (lang) => lang.code === language.code
  );

  if (!alreadyHasLanguage) {
    freelancer.languages.push(language);
    await freelancerRepository.save(freelancer);
  }
};

export const freelancerProfile = async (id: string) => {
  const freelancer = await freelancerRepository.findOne({
    where: { user: { id } },
    relations: [
      "educationList",
      "experienceList",
      "skills",
      "languages",
      "subcategories",
    ],
  });

  if (!freelancer) throw new Error("Freelancer not found");

  return freelancer;
};

export const deleteEducation = async (userId: string, educationId: string) => {
  const freelancer = await freelancerRepository.findOne({
    where: { user: { id: userId } },
    relations: ["educationList"],
  });

  if (!freelancer) {
    throw new Error("Freelancer not found");
  }

  const education = freelancer.educationList.find(
    (edu) => edu.id === educationId
  );

  if (!education) {
    throw new Error("Education not found or doesn’t belong to this freelancer");
  }

  await educationRepository.remove(education);
  return true;
};

export const deleteExperience = async (
  userId: string,
  experienceId: string
) => {
  const freelancer = await freelancerRepository.findOne({
    where: { user: { id: userId } },
    relations: ["experienceList"],
  });

  if (!freelancer) {
    throw new Error("Freelancer not found");
  }

  const experience = freelancer.experienceList.find(
    (exp) => exp.id === experienceId
  );

  if (!experience) {
    throw new Error("Education not found or doesn’t belong to this freelancer");
  }

  await experienceRepository.remove(experience);
  return true;
};

export const deleteSkill = async (userId: string, skillName: string) => {
  const freelancer = await freelancerRepository.findOne({
    where: { user: { id: userId } },
    relations: ["skills"],
  });

  if (!freelancer) {
    throw new Error("Freelancer not found");
  }

  freelancer.skills = freelancer.skills.filter(
    (skill) => skill.name !== skillName
  );

  await freelancerRepository.save(freelancer);
};

export const deleteLanguage = async (userId: string, languageId: string) => {
  const freelancer = await freelancerRepository.findOne({
    where: { user: { id: userId } },
    relations: ["languages"],
  });

  if (!freelancer) {
    throw new Error("Freelancer not found");
  }

  freelancer.languages = freelancer.languages.filter(
    (lang) => lang.id !== languageId
  );

  await freelancerRepository.save(freelancer);
};
