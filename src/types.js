/**
 * Перечисления типов
 */
export const positionType = Object.freeze({
  // notAssigned: -1,
  executiveDirector: 0,
  systemAdmin: 1,
  manager: 2,
  marketer: 3,
  engineer: 4,
  programmer: 5,
});

export const positionTypeDescription = Object.freeze({
  // [positionType.notAssigned]: 'Не назначено',
  [positionType.executiveDirector]: 'Исполнительный директор',
  [positionType.systemAdmin]: 'Системный администратор',
  [positionType.manager]: 'Менеджер',
  [positionType.marketer]: 'Маркетолог',
  [positionType.engineer]: 'Инженер',
  [positionType.programmer]: 'Программист',
});

export const genderType = Object.freeze({
  MALE: 0,
  FEMALE: 1,
});

export const genderTypeDescription = Object.freeze({
  [genderType.MALE]: 'Мужской',
  [genderType.FEMALE]: 'Женский',
});