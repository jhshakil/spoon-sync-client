import { useCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { verifyToken } from "./verifyToken";
import { TUser } from "@/types/user.types";

const GetUserFromToken = () => {
  const token = useAppSelector(useCurrentToken);
  if (token) {
    const user = verifyToken(token) as TUser;
    return user;
  } else {
    return {
      email: "",
      username: "",
      role: "",
      iat: null,
      exp: null,
    };
  }
};

export default GetUserFromToken;
