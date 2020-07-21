import PropTypes from "prop-types";
import { Flex, Box, Text, Input } from "rimble-ui";
import styled from "styled-components";

const InputWrapper = styled(Box)`
  :not(:last-child) {
    margin-bottom: 20px;
  }
`;

const InputEle = styled(Input)`
  :focus {
    border-color: ${(props) => (props.error ? "red !important" : "inherit")};
  }
`;

const Label = styled.label`
  display: flex;
  color: ${(props) => (props.error ? "red" : "inherit")};
  margin-bottom: 10px;
  span {
    margin-left: auto;
    text-align: right;
    color: ${(props) => props.theme.colors.blacks[6]};
  }
`;

const CustomInput = ({
  boxProps,
  inputProps,
  labelText,
  labelOptionalText,
  error,
  helperText,
  id,
  inputInnerBtn,
}) => {
  const helperTextColor = error ? "red" : "gray";
  return (
    <InputWrapper {...boxProps}>
      {labelText && (
        <Label htmlFor={id} error={error}>
          {labelText}{" "}
          {labelOptionalText ? <span>{labelOptionalText}</span> : ""}
        </Label>
      )}
      <Box position="relative">
        <InputEle
          id={id}
          width="100%"
          border="1px solid"
          borderColor={error ? "red" : "black"}
          borderRadius="10px"
          error={error}
          {...inputProps}
        />
        {inputInnerBtn && (
          <inputInnerBtn.type {...inputInnerBtn.props}></inputInnerBtn.type>
        )}
      </Box>
      {helperText && (
        <Text color={helperTextColor} mt="5px" fontSize="14px">
          {helperText}
        </Text>
      )}
    </InputWrapper>
  );
};

CustomInput.propTypes = {
  boxProps: PropTypes.object,
  inputProps: PropTypes.object,
  labelText: PropTypes.string,
  labelOptionalText: PropTypes.string,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  id: PropTypes.string,
  inputInnerBtn: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default CustomInput;
