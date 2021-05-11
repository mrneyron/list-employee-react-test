export const getEmployeeList = () => JSON.parse(localStorage.getItem('employees'));

export const setEmployeeList = (employees) => {
  localStorage.setItem('employees', JSON.stringify(employees));
};

export const addEmployee = (object) => {
  let employees = getEmployeeList();
  if (employees === null) {
    employees = [];
  }
  employees.push(object);
  setEmployeeList(employees);
};

export const editEmployee = (object) => {

};

export const deleteEmployee = (id) => {
  let employees = JSON.parse(localStorage.getItem('employees'));
  if (employees === null) {
    employees = [];
  }
};
