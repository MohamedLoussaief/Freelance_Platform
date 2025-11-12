import React, { useEffect, useState } from "react";
import NavBar from "../../components/organisms/NavBar";
import StepNavigation from "../../components/molecules/StepNavigation";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CheckboxItem from "../../components/atoms/CheckboxItem";
import { motion, AnimatePresence } from "framer-motion";
import InfoBox from "../../components/atoms/InfoBox";
import CloseIcon from "@mui/icons-material/Close";
import {
  Category,
  GetAllCategoriesResponse,
} from "../../utils/types/categoriesInterfaces";
import { GET_ALL_CATEGORIES } from "../../utils/queries/categoriesQueries";
import { useMutation, useQuery } from "@apollo/client/react";
import { CircularProgress } from "@mui/material";
import { ADD_USER_CATEGORIES } from "../../utils/mutations/categoriesMutations";
import { GET_FREELANCER_SERVICES } from "../../utils/queries/freelancerQueries";
import { GetFreelancerResponse } from "../../utils/types/freelancerInterface";

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

  const { data, loading, error } =
    useQuery<GetAllCategoriesResponse>(GET_ALL_CATEGORIES);

  const {
    data: data1,
    loading: loading1,
    error: error1,
  } = useQuery<GetFreelancerResponse>(GET_FREELANCER_SERVICES, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (!loading1 && !error1 && data1?.freelancer.subcategories) {
      setSelectedSubcategories(
        data1?.freelancer.subcategories.map((sub) => sub.id)
      );
    }
  }, [loading1, data1]);

  const [addService, { loading: isAdding, error: addError }] =
    useMutation(ADD_USER_CATEGORIES);

  const handleSubmit = async () => {
    try {
      await addService({
        variables: {
          servicesInput: selectedSubcategories.map((id) => ({ id })),
        },
      });
      return true;
    } catch (err: any) {
      console.error(err.message);
    }
  };

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

        {loading && loading1 ? (
          <div className="flex justify-center items-center h-96">
            {" "}
            <CircularProgress size={80} sx={{ color: "blue" }} />{" "}
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-96">
            <p className="text-red-600">No Category Found</p>
          </div>
        ) : (
          <>
            {data?.categories.map((category: Category) => (
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
              {addError && (
                <p className="text-red-600 mb-7">{addError.message} </p>
              )}
              <StepNavigation action={handleSubmit} isLoading={isAdding} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default FieldOfWork;
