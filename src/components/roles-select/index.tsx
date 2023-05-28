import { FC, useEffect, useState } from "react";

import {
  Box,
  FormControl,
  FormControlProps,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from "@mui/material";

import { getRoles } from "../../api/roles";
import { Role, RoleResponse } from "../../api/roles/types";

export type RolesSelectProps = FormControlProps & {
  onChange: (role: Role) => void;
  value: Role;
  helperText?: string | boolean;
};

export const RolesSelect: FC<RolesSelectProps> = ({
  onChange,
  value,
  helperText,
  ...rest
}) => {
  const [roles, setRoles] = useState<RoleResponse[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await getRoles();
      setRoles(res.data);
    };

    fetch();
  }, []);

  const handleChange = (event: SelectChangeEvent<Role>) => {
    // @ts-ignore
    onChange(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl
        fullWidth
        disabled={!roles.length || rest.disabled}
        {...rest}
      >
        <InputLabel>Role</InputLabel>
        <Select value={value} label="Role" onChange={handleChange}>
          {roles.map((role) => (
            <MenuItem key={role.id} value={role.value}>
              {role.value}
            </MenuItem>
          ))}
        </Select>
        {Boolean(helperText) && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </Box>
  );
};
