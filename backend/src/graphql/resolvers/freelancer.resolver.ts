import { Mutation, Resolver, Arg, Ctx, Query, Authorized } from "type-graphql";
import {
  deleteEducation,
  deleteExperience,
  deleteLanguage,
  deleteSkill,
  freelancerEducation,
  freelancerExperience,
  freelancerLanguage,
  freelancerProfile,
  freelancerSkills,
  updateFreelancerInfo,
} from "../../services/freelancer.service";
import { BioInput } from "../inputs/bio.input";
import { JobTitleInput } from "../inputs/jobTitle.input";
import { EducationInput } from "../inputs/education.input";
import { ExperienceInput } from "../inputs/experience.input";
import { SkillInput } from "../inputs/skill.input";
import { LanguageInput } from "../inputs/language.input";
import { FreelancerType } from "../types/freelancer.type";

@Resolver()
export class FreelancerResolver {
  @Mutation(() => Boolean)
  @Authorized()
  async service(@Arg("service") service: string, @Ctx() { user }: any) {
    await updateFreelancerInfo(user.id, { service });
    return true;
  }

  @Mutation(() => Boolean)
  @Authorized()
  async bio(@Arg("bioInput") bioInput: BioInput, @Ctx() { user }: any) {
    await updateFreelancerInfo(user.id, { bio: bioInput.bio });
    return true;
  }

  @Mutation(() => Boolean)
  @Authorized()
  async jobTitle(
    @Arg("jobTitleInput") jobTitleInput: JobTitleInput,
    @Ctx() { user }: any
  ) {
    await updateFreelancerInfo(user.id, { jobTitle: jobTitleInput.jobTitle });
    return true;
  }

  @Mutation(() => Boolean)
  @Authorized()
  async education(
    @Arg("educationInput") educationInput: EducationInput,
    @Ctx() { user }: any
  ) {
    await freelancerEducation(user.id, educationInput);
    return true;
  }

  @Mutation(() => Boolean)
  @Authorized()
  async experience(
    @Arg("experienceInput") experienceInput: ExperienceInput,
    @Ctx() { user }: any
  ) {
    await freelancerExperience(user.id, experienceInput);
    return true;
  }

  @Mutation(() => Boolean)
  @Authorized()
  async skills(
    @Arg("skillsInput", () => [SkillInput]) skillsInput: SkillInput[],
    @Ctx() { user }: any
  ) {
    await freelancerSkills(user.id, skillsInput);
    return true;
  }

  @Mutation(() => Boolean)
  @Authorized()
  async language(
    @Arg("languageInput") languageInput: LanguageInput,
    @Ctx() { user }: any
  ) {
    await freelancerLanguage(user.id, languageInput);
    return true;
  }

  @Query(() => FreelancerType)
  @Authorized()
  async freelancer(@Ctx() { user }: any) {
    return await freelancerProfile(user.id);
  }

  @Mutation(() => Boolean)
  @Authorized()
  async deleteFreelancerEducation(
    @Ctx() { user }: any,
    @Arg("educationId") educationId: string
  ) {
    await deleteEducation(user.id, educationId);
    return true;
  }

  @Mutation(() => Boolean)
  @Authorized()
  async deleteFreelancerExperience(
    @Ctx() { user }: any,
    @Arg("experienceId") experienceId: string
  ) {
    await deleteExperience(user.id, experienceId);
    return true;
  }

  @Mutation(() => Boolean)
  @Authorized()
  async deleteFreelancerSkill(
    @Ctx() { user }: any,
    @Arg("skillId") skillId: string
  ) {
    await deleteSkill(user.id, skillId);
    return true;
  }

  @Mutation(() => Boolean)
  @Authorized()
  async deleteFreelancerLanguage(
    @Ctx() { user }: any,
    @Arg("languageId") languageId: string
  ) {
    deleteLanguage(user.id, languageId);
    return true;
  }
}
