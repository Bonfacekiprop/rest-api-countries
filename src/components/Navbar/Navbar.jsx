/* eslint-disable prettier/prettier */
import React from "react";
import {
  Stack,
  useColorMode,
  Button,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

export function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Stack
      alignItems="center"
      backgroundColor={useColorModeValue(
        `var(--white-color)`,
        `var(--blue-dark)`
      )}
      h="70px"
      justifyContent="center"
      position="absolute"
      px={{ base: 5, sm: 20, lg: 30, xl: "5vw" }}
      py={4}
      top={0}
      w="100%"
    >
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        // maxW={{ base: "100%", xl: "1152px" }}
        w="100%"
      >
        <Text color={colorMode === "dark" ? "white" : "black"} fontWeight={800}>
          Where In the world?
        </Text>

        <Button
          fontSize={"var(--txt-home-size)"}
          fontWeight="300"
          leftIcon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
          // px={{ base: 0, lg: 4 }}
          p={0}
          variant={"ghost"}
          onClick={toggleColorMode}
        >
          Dark Mode
        </Button>
      </Stack>
    </Stack>
  );
}
