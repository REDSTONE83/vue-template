const userModel = {
  firstname: { type: 'string' },
  lastname: { type: 'string' },
  age: { type: 'string' },
  gender: { type: 'string' },
  email: { type: 'string' },
  address: { type: 'string' },
  nation: { type: 'string' },
  phone: { type: 'string' },
  salary: { type: 'string' },
  department: { type: 'string' },
  nickname: { type: 'string' },
};

const userSearchConditionModel = {
  name: { type: 'string' },
  age: { type: 'string' },
  gender: { type: 'string' },
};

export { userModel, userSearchConditionModel };
