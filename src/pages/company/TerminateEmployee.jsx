import { Grid, Typography } from '@mui/material';
import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import EmployeesTable from './components/tableTerminateEmployee';
import RankEmployeesTable from './components/rankEmployee';
import RetrieveTerminationData from './components/RetrieveTerminationData';

function TerminateEmployee() {
    const currentMonth = dayjs().format('MMM YYYY');
    const [targetMonth, setTargetMonth] = useState(currentMonth);
    const [requiredCount, setRequiredCount] = useState(0);
    const employees = useSelector((state) => state.company.employees);

    // Derived from real employee records (backend) so it survives refresh,
    // instead of an in-memory counter that reset on remount. An employee
    // counts against the month's quota once assigned a termination date in
    // that month, whether or not the date itself has passed yet.
    const completedCount = employees.filter((employee) => {
        if (!employee.terminationDate) return false;
        return dayjs(employee.terminationDate).format('MMM YYYY') === targetMonth;
    }).length;

    const handleMonthLoaded = useCallback((month, required) => {
        setTargetMonth(month);
        setRequiredCount(required);
    }, []);

    // Terminate button only active when viewing current month, there are pending
    // terminations, and the month's quota hasn't already been fulfilled
    const canTerminate = targetMonth === currentMonth && requiredCount > 0 && completedCount < requiredCount;

    return (
        <>
            <Grid container spacing={{ xs: 3, lg: 4 }}>
                <Grid item xs={12}>
                    <Typography variant="h4">Terminate Employees</Typography>
                </Grid>
                <Grid item xs={12}>
                    <RetrieveTerminationData
                        completedCount={completedCount}
                        onMonthLoaded={handleMonthLoaded}
                    />
                </Grid>
                <Grid item xs={12}>
                    <EmployeesTable
                        targetMonth={targetMonth}
                        canTerminate={canTerminate}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h4" style={{ marginTop: '60px' }}>Run TOPSIS Analysis</Typography>
                </Grid>
                <Grid item xs={12}>
                    <RankEmployeesTable canTerminate={canTerminate} />
                </Grid>
            </Grid>
        </>
    );
}

export default TerminateEmployee;
