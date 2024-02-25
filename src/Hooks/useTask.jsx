import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxios from "./useAxios";

const useTask = () => {
  const { user } = useAuth();
  const axiosPubic = useAxios();
  const { data: task, refetch } = useQuery({
    queryKey: ["task"],
    queryFn: async () => {
      const res = await axiosPubic.get(`/get-task/${user?.email}`);
      return res.data;
    },
  });

  return [task, refetch];
};

export default useTask;
