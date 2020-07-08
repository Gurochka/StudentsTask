import React from 'react';
import { StudentForm } from '../form';

export const View = () => {
    return (
        <>
            <div>Edit Student</div>
            <StudentForm onSave={() => { console.log('save!'); }}/>
        </>
    );
};
