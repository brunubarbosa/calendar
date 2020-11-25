export interface FormDataType {
  name: string;
  email: string;
  tel: string;
}
export interface ContacDataType extends FormDataType {
  picture: React.ReactElement;
  id: string;
  recentlyAdded: boolean;
}
