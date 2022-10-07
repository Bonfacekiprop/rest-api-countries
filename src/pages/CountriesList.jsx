/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  useOutsideClick,
  chakra,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  useColorMode,
} from "@chakra-ui/react";
import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";

import { setFilterParam } from "../features/actions/actions";
import { BasicLayout } from "../layout";
import CountryCard from "../components/CountryCard";
import { useFetchAllCountriesQuery } from "../services/countries.api";

const regions = ["All", "Africa", "Americas", "Asia", "Antarctic", "Oceania"];

export const CountriesList = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");

  const { filterParam } = useSelector((state) => state.filters);

  const {
    data: countries,
    error,
    isLoading: loading,
    isFetching: fetching,
  } = useFetchAllCountriesQuery();

  const [searchParam] = useState(["region", "name"]);

  const { colorMode } = useColorMode();

  function search(items) {
    // eslint-disable-next-line array-callback-return
    return items?.filter((item) => {
      /*
    // in here we check if our region is equal to our c state
    // if it's equal to then only return the items that match
    // if not return All the countries
    */
      if (searchParam === "") {
        return items;
      } else if (item.region === filterParam) {
        return searchParam.some((newItem) => {
          return (
            item[newItem]
              .toString()
              .toLowerCase()
              .indexOf(query.toLowerCase()) > -1
          );
        });
      } else if (filterParam === "All") {
        return searchParam.some((newItem) => {
          return (
            item[newItem]
              .toString()
              .toLowerCase()
              .indexOf(query.toLowerCase()) > -1
          );
        });
      }
    });
  }

  const onInputChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <BasicLayout>
      <Stack
        minH={`calc(100vh - 70px)`}
        overflowY="hidden"
        pb="40"
        px={{ base: 5, lg: "5vw" }}
      >
        <Stack
          direction={{ base: "column", md: "row" }}
          justifyContent={"space-between"}
          mr={{ base: "0px", lg: "15px" }}
          mt="20px"
        >
          <InputGroup
            boxShadow={"md"}
            h="40px"
            mb={{ base: "20px" }}
            w={{ base: "100%", md: "50vw", lg: "30vw" }}
          >
            <InputLeftAddon
              backgroundColor={useColorModeValue(
                `var(--white-color)`,
                `var(--blue-dark)`
              )}
              border="none"
              borderRadius={"5px"}
              transition={".3s"}
            >
              <SearchIcon
                color={useColorModeValue(`gray.400`, `var(--white-color)`)}
              />
            </InputLeftAddon>
            <Input
              backgroundColor={useColorModeValue(
                `var(--white-color)`,
                `var(--blue-dark)`
              )}
              border="none"
              borderRadius={"5px"}
              color={useColorModeValue(
                `var(--input-bg-light-mode)`,
                `var(--white-color)`
              )}
              fontSize={`var(--txt-home-size)`}
              placeholder="Search for a country..."
              size={"md"}
              value={query}
              w={{ base: "100%" }}
              onChange={(e) => onInputChange(e)}
            />
          </InputGroup>
          {/* <Box d={{ base: "flex", lg: "block" }} position={"relative"}> */}
          <Popover isOpen={isOpen} returnFocusOnClose={false} onClose={onClose}>
            <PopoverTrigger>
              <Button
                backgroundColor={useColorModeValue(
                  `var(--white-color)`,
                  `var(--blue-dark)`
                )}
                borderRadius="3px"
                boxShadow="md"
                color={useColorModeValue(
                  `var(--text-color-light-mode)`,
                  `var(--white-color)`
                )}
                cursor={"pointer"}
                fontSize={`var(--txt-home-size)`}
                fontWeight="300"
                px={"20px"}
                w="250px"
                onClick={onToggle}
              >
                <Flex alignItems={"center"} justifyContent={"center"}>
                  <Text pr={"30px"}>
                    <chakra.span fontWeight={500}>
                      Filter by Region:
                    </chakra.span>{" "}
                    {filterParam}
                  </Text>
                  <ChevronDownIcon />
                </Flex>
              </Button>
            </PopoverTrigger>
            <PopoverContent borderRadius={"3px"} boxShadow={"md"} w="250px">
              <PopoverBody w="250px">
                <Flex
                  bg={useColorModeValue(
                    `var(--white-color)`,
                    `var(--blue-dark)`
                  )}
                  color={useColorModeValue(
                    `var(--text-color-light-mode)`,
                    `var(--white-color)`
                  )}
                  fontSize={`var(--txt-home-size)`}
                >
                  <Stack spacing="3px" textAlign={"left"} w="100%">
                    {regions.map((region, i) => {
                      return (
                        <Box
                          key={i}
                          _hover={{
                            bg: colorMode == "light" ? "gray.200" : "gray.600",
                          }}
                          cursor={"pointer"}
                          w="100%"
                          onClick={() => {
                            dispatch(setFilterParam(region));
                            onToggle();
                          }}
                        >
                          {region}
                        </Box>
                      );
                    })}
                  </Stack>
                </Flex>
              </PopoverBody>
            </PopoverContent>
          </Popover>
          {/* </Box> */}
        </Stack>
        {loading || fetching ? (
          <SimpleGrid columns={[1, 2, 2, 3, 4]} pt="8" spacing="54px" w="100%">
            <Skeleton h="300px" w="250px" />
            <Skeleton h="300px" w="250px" />
            <Skeleton h="300px" w="250px" />
            <Skeleton h="300px" w="250px" />
          </SimpleGrid>
        ) : (
          <>
            {search(countries)?.length === 0 ? (
              <Center>
                <Text mb="20vh" mt="10vh" p={20}>
                  No country with that description found{" "}
                </Text>
              </Center>
            ) : (
              <SimpleGrid
                columns={[1, 2, 2, 3, 4]}
                justifyItems={"center"}
                spacing="54px"
                w="100%"
              >
                {search(countries)?.map((country, i) => {
                  return <CountryCard key={`key-${i}`} country={country} />;
                })}
              </SimpleGrid>
            )}
          </>
        )}
      </Stack>
    </BasicLayout>
  );
};
