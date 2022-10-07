/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Button,
  Image,
  chakra,
  SimpleGrid,
  Stack,
  Text,
  Flex,
  Box,
  Spinner,
  useColorMode,
  Center,
} from "@chakra-ui/react";
import React from "react";
import { useHistory, useParams } from "react-router-dom";

import { BasicLayout } from "../layout";
import { useFetchCountryDetailsQuery } from "../services/countries.api";

const spanStyles = {
  color: `gray.400`,
  fontSize: `var(--txt-home-size)`,
};

export const CountryDetails = () => {
  const { countryName } = useParams();
  const history = useHistory();
  const { colorMode } = useColorMode();
  const {
    data: details,
    error,
    isLoading: loading,
    isFetching: fetching,
  } = useFetchCountryDetailsQuery(countryName);

  console.log("details", details);

  return (
    <BasicLayout>
      <Stack minH={`calc(100vh - 70px)`} px={{ base: 5, lg: "5vw" }}>
        <Button
          leftIcon={<ChevronLeftIcon />}
          mt="20px"
          w="100px"
          onClick={() => history.push(`/`)}
        >
          Back
        </Button>
        {loading || fetching ? (
          <Center h="70vh">
            <Spinner h="200px" w="200px" />
          </Center>
        ) : (
          <>
            {details?.map((detail, i) => {
              return (
                <SimpleGrid key={i} columns={{ base: 1, lg: 2 }} pt="20px">
                  <Image
                    borderTopRadius={"5px"}
                    h="300px"
                    mt={{ base: "30px" }}
                    objectFit={"cover"}
                    src={`${detail.flag}`}
                    w={{ base: "100%", lg: "80%" }}
                  />
                  <Stack spacing={3} textAlign={"left"}>
                    <Text
                      fontSize={`var(--txt-detail-size)`}
                      fontWeight="600"
                      letterSpacing={0.5}
                      pb="3"
                      pt={{ base: "8", lg: "3" }}
                    >
                      {detail.commonName}
                    </Text>
                    <SimpleGrid columns={[1, 2]}>
                      <Box>
                        <Text
                          fontSize={`var(--txt-home-size)`}
                          fontWeight="300"
                          w="100%"
                        >
                          Native Name:{" "}
                          <chakra.span {...spanStyles}>
                            {detail.nativeName}
                          </chakra.span>
                        </Text>
                        <Text
                          fontSize={`var(--txt-home-size)`}
                          fontWeight="300"
                          w="100%"
                        >
                          Population:{" "}
                          <chakra.span {...spanStyles}>
                            {detail.population}
                          </chakra.span>
                        </Text>
                        <Text
                          fontSize={`var(--txt-home-size)`}
                          fontWeight="300"
                          w="100%"
                        >
                          Region:{" "}
                          <chakra.span {...spanStyles}>
                            {detail.region}
                          </chakra.span>
                        </Text>
                        <Text
                          fontSize={`var(--txt-home-size)`}
                          fontWeight="300"
                          w="100%"
                        >
                          Sub Region:{" "}
                          <chakra.span {...spanStyles}>
                            {detail.subRegion}
                          </chakra.span>
                        </Text>
                        <Text
                          fontSize={`var(--txt-home-size)`}
                          fontWeight="300"
                          w="100%"
                        >
                          Capital:{" "}
                          <chakra.span {...spanStyles}>
                            {detail.capital}
                          </chakra.span>
                        </Text>
                      </Box>
                      <Box mt={["30px", 0]}>
                        <Text
                          fontSize={`var(--txt-home-size)`}
                          fontWeight="300"
                          w="100%"
                        >
                          Top Level Domain:{" "}
                          <chakra.span {...spanStyles}>
                            {detail.tld}
                          </chakra.span>
                        </Text>
                        <Text
                          fontSize={`var(--txt-home-size)`}
                          fontWeight="300"
                          w="100%"
                        >
                          Currency:{" "}
                          <chakra.span {...spanStyles}>
                            {detail.currencies}
                          </chakra.span>
                        </Text>
                        <Text
                          fontSize={`var(--txt-home-size)`}
                          fontWeight="300"
                          w="100%"
                        >
                          Languages:{" "}
                          <chakra.span {...spanStyles}>
                            {detail.languages}
                          </chakra.span>
                        </Text>
                      </Box>
                    </SimpleGrid>
                    <Flex
                      alignItems="baseline"
                      flexDir={{ base: "column", lg: "row" }}
                      justifyContent={"flex-start"}
                      pt={{ base: "5", lg: "10" }}
                    >
                      <Text
                        flexShrink={0}
                        fontSize={`var(--txt-home-size)`}
                        fontWeight="500"
                        mr="2"
                      >
                        Border Countries:
                      </Text>
                      <Flex flexWrap="wrap" pt={{ base: "10px" }}>
                        {detail?.borders?.map((country, i) => {
                          return (
                            <Button
                              key={i}
                              bg={
                                colorMode == "light"
                                  ? "transparent"
                                  : `var(--blue-dark)`
                              }
                              borderColor={
                                colorMode == "light" ? "gray.300" : "none"
                              }
                              borderWidth={colorMode == "light" ? "1px" : "0"}
                              fontWeight="300"
                              mb="3"
                              mr="2"
                              px="8"
                              size="sm"
                              onClick={() =>
                                history.push(`/countries/${country}`)
                              }
                            >
                              {country}
                            </Button>
                          );
                        })}
                      </Flex>
                    </Flex>
                  </Stack>
                </SimpleGrid>
              );
            })}
          </>
        )}
      </Stack>
    </BasicLayout>
  );
};
