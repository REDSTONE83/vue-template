import { authHttp } from '@/system/api';

const range = function(start, stop, step) {
  return Array.from(
    { length: (stop - start) / step + 1 },
    (_, i) => start + i * step,
  );
};

function fetchUsers(params) {
  // return authHttp.get('api/user', {
  //   params,
  // });

  return new Promise((resolve, reject) => {
    const NAMES = ['Kim', 'Lee', 'Park', 'Kang', 'Seo'];
    const GENDER = ['M', 'F'];

    resolve({
      data: {
        users: range(1, 1000000, 1).map(value => {
          return {
            firstname: NAMES[Math.floor(Math.random() * 3)],
            lastname: NAMES[Math.floor(Math.random() * 3)],
            age: String(Math.floor(Math.random() * 50)),
            gender: GENDER[Math.floor(Math.random() * 2)],
            email: '',
            address: '',
            nation: '',
            phone: '',
            salary: '',
            department: '',
            nickname: '',
          };
        }),
      },
    });
  });
}

export { fetchUsers };
