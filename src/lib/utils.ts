import { Todo } from "../redux/todo/types";

/**
 * @description 기간이 지났는지 확인
 * @param endDate 할일의 마감 기한
 * @returns 기한이 지난 경우 true를 반환
 */
export const checkDeadline = (endDate: Todo['endDate']): boolean => {
  const eDate = new Date(endDate);
  const tDate = new Date();
  return (tDate.getTime() > eDate.getTime());
};

/**
 * @description 날짜를 화면에 보여질 포맷으로 변환
 * @param endDate 할일의 마감 기한
 * @returns 변환된 날짜
 */
export const stringDeadline = (endDate: Todo['endDate']): string => {
  if (!endDate) return '기한없음'; 
  const splitDate = endDate.split('T');
  return `${splitDate[0]} ${splitDate[1]} 까지`;
};
