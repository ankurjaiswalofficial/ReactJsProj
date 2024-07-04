import React, { useState } from 'react';
import {
    List,
    ListItem,
    ListItemText,
    Collapse,
    Checkbox,
    ListItemIcon,
    IconButton,
    Card
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { DepartmentInterface } from '../Interfaces/DepartmentInterface';

const departments: DepartmentInterface[] = [
    {
        department: "customer_service",
        sub_departments: ["support", "customer_success"]
    },
    {
        department: "design",
        sub_departments: ["graphic_design", "product_design", "web_design"]
    }
];

const Component2: React.FC = () => {
    const [open, setOpen] = useState<{ [key: string]: boolean }>({});
    const [selected, setSelected] = useState<{ [key: string]: boolean }>({});

    const handleToggle = (dept: string) => {
        setOpen(prev => {
            const newSelected = { ...prev };
            newSelected[dept] = !prev[dept];
            return newSelected;
        });
    };

    const handleSelect = (dept: string, subDept?: string) => {
        if (subDept) {
            setSelected(prev => {
                const newSelected = { ...prev };
                newSelected[`${dept}-${subDept}`] = !prev[`${dept}-${subDept}`];
                const department = departments.find(d => d.department === dept);
                if (department) {
                    const allSubDepartmentsSelected = department.sub_departments.every(sub => newSelected[`${dept}-${sub}`]);
                    newSelected[dept] = allSubDepartmentsSelected;
                }
                return newSelected;
            });
        } else {
            setSelected(prev => {
                const newSelected = { ...prev };
                const isDeptSelected = !prev[dept];
                newSelected[dept] = isDeptSelected;
                const department = departments.find(d => d.department === dept);
                if (department) {
                    department.sub_departments.forEach(sub => {
                        newSelected[`${dept}-${sub}`] = isDeptSelected;
                    });
                }
                return newSelected;
            });
        }
    };

    return (
        <Card sx={{ maxWidth: "sm", minHeight: "30vh", maxHeight: "100vh", overflowY: "scroll" }} >
            <List>
                {departments.map(department => (
                    <div key={department.department}>
                        <ListItem>
                            <IconButton onClick={() => handleToggle(department.department)}>
                                {open[department.department] ? <Remove /> : <Add />}
                            </IconButton>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={selected[department.department] || false}
                                    onClick={() => handleSelect(department.department)}
                                />
                            </ListItemIcon>
                            <ListItemText primary={department.department} />
                        </ListItem>
                        <Collapse in={open[department.department]} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {department.sub_departments.map(subDept => (
                                    <ListItem key={subDept} sx={{ pl: 12 }}>
                                        <ListItemIcon>
                                            <Checkbox
                                                edge="start"
                                                checked={selected[`${department.department}-${subDept}`] || false}
                                                onClick={() => handleSelect(department.department, subDept)}
                                            />
                                        </ListItemIcon>
                                        <ListItemText primary={subDept} />
                                    </ListItem>
                                ))}
                            </List>
                        </Collapse>
                    </div>
                ))}
            </List>
        </Card>
    );
};

export default Component2;
