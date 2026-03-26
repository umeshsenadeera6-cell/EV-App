import "@react-navigation/native";
import "@react-navigation/native-stack";
import "nativewind";

declare module "nativewind" {
  export interface HTMLAttributes<T> extends React.HTMLAttributes<T> {
    className?: string;
  }
}
