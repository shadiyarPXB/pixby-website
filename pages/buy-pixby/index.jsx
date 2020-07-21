import React, { useState } from "react";
// import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Flex, Box, Heading, Form, Button, Radio, Text } from "rimble-ui";
import styled from "styled-components";
import CustomInput from "../../components/CustomInput/CustomInput";

const StakingWrapper = styled(Box)`
  position: relative;
  min-height: 100vh;
  ::after {
    position: absolute;
    content: "";
    left: 0;
    top: 0;
    height: 100%;
    width: 50%;
    background-color: #ddd;
    background-image: url(${require("./staking.jpeg")});
    background-size: cover;
    background-position: center;
    display: none;

    @media only screen and (min-width: ${(props) =>
        props.theme.breakpoints[2]}) {
      display: block;
    }
  }
`;

const FormBoxWrapper = styled(Box)`
  position: relative;
  box-shadow: 0 0 20px rgba(50, 50, 93, 0.2);
`;

const RadioButton = styled(Radio)`
  svg[name="checked"] {
    fill: ${(props) => props.theme.colors.black};
  }
`;

const MenuTriggerButton = styled.span`
  margin-left: auto;
  font-size: 26px;
  cursor: pointer;
  transition: 0.3s;
  :hover {
    opacity: 0.5;
  }
`;

const MenuWrapper = styled(Box)`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transition: 0.2s;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  z-index: ${(props) => (props.isOpen ? 999 : -1)};
`;
const Menu = styled.div`
  a {
    display: block;
    padding: 15px 10px;
    text-decoration: none;
    font-size: 20px;
    color: ${(props) => props.theme.colors.black};
    position: relative;
    padding-left: 50px;
    transition: 0.3s;
  }
  a:hover {
    background-color: ${(props) => props.theme.colors["near-white"]};
  }
  a i {
    position: absolute;
    left: 10px;
    height: 100%;
    width: 35px;
  }
`;

const menuLinks = [
  { title: "Trade History", href: "/", icon: "fa-credit-card" },
  { title: "Language", href: "/", icon: "fa-flag" },
  { title: "Default currency", href: "/", icon: "fa-globe" },
  { title: "About us", href: "/", icon: "fa-info" },
  { title: "Contact us", href: "/", icon: "fa-comment" },
];

const Staking = () => {
  const [menuOpen, setMenuOpen] = useState(false); // Initiate hook form
  const { register, handleSubmit, errors, control } = useForm({
    mode: ["onChange", "onBlur"],
  });

  const onSubmitHandler = (data, e) => {
    console.log(data);
  };
  return (
    <StakingWrapper as="section">
      <Flex
        width={[1, 1, 1, 1 / 2]}
        justifyContent="center"
        alignItems="center"
        ml="auto"
        minHeight="100vh"
        p="30px"
      >
        <FormBoxWrapper
          width={["100%", "80%", "60%"]}
          p="30px"
          borderRadius="10px"
          position="relative"
          maxWidth="700px"
        >
          <Flex mb="50px">
            <Heading as="h4">Buy PIXBY (PIXBY/ETH)</Heading>
            <MenuTriggerButton onClick={() => setMenuOpen(true)}>
              <i className="fa fa-bars"></i>
            </MenuTriggerButton>
          </Flex>
          <Form onSubmit={handleSubmit(onSubmitHandler)}>
            <CustomInput
              id="amount"
              labelText="Amount"
              labelOptionalText="18299.9283PIXBY"
              inputProps={{
                name: "amount",
                ref: register({
                  required: "Amount is required.",

                  validate: {
                    minMax: (v) => {
                      const value = parseInt(v, 10);
                      return value < 35000 || value > 2500000 || isNaN(value)
                        ? "Amount should greater than 35000 and less than 2500000"
                        : true;
                    },
                  },
                }),
              }}
              error={!!errors?.amount}
              helperText={errors?.amount?.message}
              inputInnerBtn={
                <Button
                  mainColor="black"
                  position="absolute"
                  right="16px"
                  top="50%"
                  style={{ transform: "translateY(-50%)" }}
                  height="auto"
                  p="5px 10px"
                  minWidth="auto"
                >
                  Max
                </Button>
              }
            />

            <Box mb="20px">
              <Text mb="10px">Summary</Text>
              <Flex>
                <Text color="near-black">1,030,201.042 PIXBY @0.002</Text>
                <Text ml="auto" fontWeight="700">
                  100 USD
                </Text>
              </Flex>
            </Box>
            <Box mb="40px">
              <Text mb="5px">Transaction Speed</Text>
              <Flex flexWrap="wrap">
                <RadioButton
                  name="TransactionSpeed"
                  label="Slow"
                  color="black"
                  ref={register({})}
                />
                <RadioButton
                  name="TransactionSpeed"
                  label="Normal"
                  color="black"
                  ref={register({})}
                />
                <RadioButton
                  name="TransactionSpeed"
                  label="Fast"
                  color="black"
                  ref={register({})}
                />
              </Flex>
            </Box>
            <Button
              mainColor="black"
              type="submit"
              width="100%"
              borderRadius="10px"
            >
              Buy PIXBY
            </Button>
          </Form>

          <MenuWrapper
            p="30px"
            backgroundColor="white"
            borderRadius="10px"
            isOpen={menuOpen}
          >
            <Flex mb="50px">
              <Heading as="h4">Menu</Heading>
              <MenuTriggerButton onClick={() => setMenuOpen(false)}>
                <i className="fa fa-close"></i>
              </MenuTriggerButton>
            </Flex>
            <Menu>
              {menuLinks.map((link, index) => (
                <Link href={link.href} key={index}>
                  <a>
                    <i className={`fa ${link.icon}`}></i> {link.title}
                  </a>
                </Link>
              ))}
            </Menu>
          </MenuWrapper>
        </FormBoxWrapper>
      </Flex>
    </StakingWrapper>
  );
};

Staking.propTypes = {};

export default Staking;
