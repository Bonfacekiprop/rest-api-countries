import { Image, Stack, Text, VStack, chakra } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import { useHistory } from "react-router-dom";

const spanStyles = {
  color: `gray.400`,
  fontSize: `var(--txt-home-size)`,
};

const CountryCard = ({ country }) => {
  const MotionStack = motion(Stack);
  const history = useHistory();

  return (
    <MotionStack
      rounded
      borderRadius={"5px"}
      boxShadow={"lg"}
      cursor={"pointer"}
      h="100%"
      mt="5"
      pb="2"
      textAlign={"left"}
      w="250px"
      whileHover={{ scale: 1.08 }}
      onClick={() => history.push(`/countries/${country.name}`)}
    >
      <Image
        borderTopRadius={"5px"}
        h="170px"
        objectFit={"cover"}
        src={`${country?.flag}`}
        w="100%"
      />
      <Text
        fontSize={`var(--txt-detail-size)`}
        fontWeight="600"
        pb="1"
        pt="3"
        px="5"
      >
        {country.name}
      </Text>
      <VStack pb="5" px="5" spacing="0" textAlign={"left"}>
        <Text fontSize={`var(--txt-home-size)`} fontWeight="300" w="100%">
          Population:{" "}
          <chakra.span {...spanStyles}>{country.population}</chakra.span>
        </Text>
        <Text fontSize={`var(--txt-home-size)`} w="100%">
          Region: <chakra.span {...spanStyles}>{country.region}</chakra.span>
        </Text>
        <Text fontSize={`var(--txt-home-size)`} w="100%">
          Capital: <chakra.span {...spanStyles}>{country?.capital}</chakra.span>
        </Text>
      </VStack>
    </MotionStack>
  );
};

export default CountryCard;
