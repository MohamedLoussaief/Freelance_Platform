import React, { useState } from "react";
import { TextField, MenuItem, Box, Select, InputAdornment, SelectChangeEvent } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBarWithFilter: React.FC = () => {
  const [filter, setFilter] = useState("Talents"); 
  const [searchTerm, setSearchTerm] = useState("");

  
  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    setFilter(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2, 
      }}
    >
      {/* Search Bar */}
      <TextField
        variant="outlined"
        size="small"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder={`Search ${filter}`}
        sx={{
          flex: 1, // Takes up the remaining space
          backgroundColor: "white",
          borderColor: "#e1e1e1",
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Select
                  value={filter}
                  onChange={handleFilterChange}
                  variant="standard"
                  size="small"
                  sx={{
                    height: "100%",
                    backgroundColor: "transparent",
                    color: "black", 
                    paddingTop:"5px",
                    borderRadius: "4px", 
                    border: "none", 
                    textTransform: "none",
                    "&:focus": {
                      outline: "none",
                    },

                    "& .MuiSelect-icon": {
                      marginTop: "-1px", 
                    },
                    cursor: "pointer", 
                  }}
                  disableUnderline
                >
                  <MenuItem value="Talents">Talents</MenuItem>
                  <MenuItem value="Jobs">Jobs</MenuItem>
                </Select>
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
};

export default SearchBarWithFilter;
