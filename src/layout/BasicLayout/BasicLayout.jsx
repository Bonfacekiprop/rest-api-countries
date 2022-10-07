/* eslint-disable prettier/prettier */
import React from "react";
import { Box, Stack, useColorModeValue } from "@chakra-ui/react";

import { Navbar } from "../../components";

export const BasicLayout = ({ children }) => {
  return (
    <Stack overflowX="hidden">
      <Box>
        <Navbar />
      </Box>
      <Stack
        backgroundColor={useColorModeValue(
          `var(--bg-light-mode)`,
          `var(--bg-blue-dark)`
        )}
        pt={"80px"}
        w="100vw"
      >
        <Stack spacing={6} textAlign="center">
          {children}
        </Stack>
      </Stack>
    </Stack>
  );
};
