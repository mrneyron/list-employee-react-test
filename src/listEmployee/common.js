export const addEmployee = (object) => {
  let employees = JSON.parse(localStorage.getItem('employees'));
  console.log(employees);
  if (employees === null) {
    employees = [];
  }
  employees.push(object);
  console.log(employees);
  localStorage.setItem('employees', JSON.stringify(employees));
};

export const editEmployee = (id, object) => {

};

export const getEmployeeList = () => {
  return JSON.parse(localStorage.getItem('employees'));
};

export const setEmployeeList = (employees) => {
  localStorage.setItem('employees', JSON.stringify(employees));
};

export const deleteEmployee = (id) => {
  let employees = JSON.parse(localStorage.getItem('employees'));
  if (employees === null) {
    employees = [];
  }
};
