import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getById } from "../../../../features/users/usersSlice";
import OtherUserDetail from "../OtherUserDetail";
import "./SearchUser.scss";

const SearchUser = () => {
  const { _id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getById(_id));
  }, [_id]);
  return (
    <>
      <OtherUserDetail />
    </>
  );
};

export default SearchUser;
