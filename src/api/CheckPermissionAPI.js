import { PermissionsAndroid } from "react-native";

export default async function CheckPermissionAPI() {
  const isPermissionToLocation = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
  const isPermissionToCamera = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);

  if (isPermissionToLocation && isPermissionToCamera) return true;

  return false;
}
