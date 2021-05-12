export const getEmployeeList = () => JSON.parse(localStorage.getItem('employees'));

export const setEmployeeList = (employees) => {
  localStorage.setItem('employees', JSON.stringify(employees));
};

export const addEmployee = (object) => {
  let employees = getEmployeeList();
  let lastId = -1;
  if (employees === null) {
    employees = [];
  } else {
    lastId = employees[employees.length - 1].id;
  }
  object.id = lastId + 1;
  employees.push(object);
  setEmployeeList(employees);
};

export const editEmployee = (object) => {
  const employees = getEmployeeList();
  const newEmployees = employees.map((o) => {
    if (o.id === object.id) {
      return object;
    }
    return o;
  });
  setEmployeeList(newEmployees);
};

export const deleteEmployee = (id) => {
  let employees = getEmployeeList();
  if (employees === null) {
    employees = [];
  }
  const index = employees.findIndex((x) => x.id === id);
  if (index > -1) {
    employees.splice(index, 1);
  }
  setEmployeeList(employees);
};
