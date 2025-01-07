import { useMutation, useQueryClient } from '@tanstack/react-query';

import toast from 'react-hot-toast';
import { updateCurrentUser } from '../../services/apiAuth';

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: userData => {
      const userName = userData.user.user_metadata.fullName;
      toast.success(`${userName} account information successfully updated`);
      queryClient.invalidateQueries(['user']);
    },
    onError: error => {
      console.error(error);
      toast.error('Failed to update user information.');
    },
  });

  return { updateUser, isUpdating };
}
