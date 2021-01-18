import { authHttp } from '@/system/api';

function fetchUsers(paramsObj) {
  return authHttp.get('users', {
    params: paramsObj,
  });
}

export { fetchUsers };
