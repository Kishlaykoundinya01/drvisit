import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const DoctorProfile = () => {

    const { dToken, profileData, setProfileData, getProfileData, backendUrl, changePassword } = useContext(DoctorContext)
    const { currency} = useContext(AppContext)
    const [isEdit, setIsEdit] = useState(false)
    const [showPasswordChange, setShowPasswordChange] = useState(false)
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const updateProfile = async () => {

        try {

            const updateData = {
                address: profileData.address,
                fees: profileData.fees,
                about: profileData.about,
                available: profileData.available
            }

            const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { headers: { dToken } })

            if (data.success) {
                toast.success(data.message)
                setIsEdit(false)
                getProfileData()
            } else {
                toast.error(data.message)
            }

            setIsEdit(false)

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    const handleChangePassword = async () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            toast.error('Please fill all password fields')
            return
        }

        if (newPassword.length < 8) {
            toast.error('New password must be at least 8 characters')
            return
        }

        if (newPassword !== confirmPassword) {
            toast.error('New passwords do not match')
            return
        }

        if (currentPassword === newPassword) {
            toast.error('New password must be different from current password')
            return
        }

        const success = await changePassword(currentPassword, newPassword)
        if (success) {
            setCurrentPassword('')
            setNewPassword('')
            setConfirmPassword('')
            setShowPasswordChange(false)
        }
    }

    useEffect(() => {
        if (dToken) {
            getProfileData()
        }
    }, [dToken])

    return profileData && (
        <div>
            <div className='flex flex-col gap-4 m-5'>
                <div>
                    <img className='bg-primary/80 w-full sm:max-w-64 rounded-lg' src={profileData.image} alt="" />
                </div>

                <div className='flex-1 border border-stone-100 dark:border-slate-700 rounded-lg p-8 py-7 bg-white dark:bg-slate-800 transition-colors'>

                    {/* ----- Doc Info : name, degree, experience ----- */}

                    <p className='flex items-center gap-2 text-3xl font-medium text-gray-700 dark:text-slate-200'>{profileData.name}</p>
                    <div className='flex items-center gap-2 mt-1 text-gray-600 dark:text-slate-400'>
                        <p>{profileData.degree} - {profileData.speciality}</p>
                        <button className='py-0.5 px-2 border border-gray-300 dark:border-slate-600 text-xs rounded-full dark:text-slate-300'>{profileData.experience}</button>
                    </div>

                    {/* ----- Doc About ----- */}
                    <div>
                        <p className='flex items-center gap-1 text-sm font-medium text-[#262626] dark:text-slate-300 mt-3'>About :</p>
                        <p className='text-sm text-gray-600 dark:text-slate-400 max-w-[700px] mt-1'>
                            {
                                isEdit
                                    ? <textarea onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))} type='text' className='w-full outline-primary p-2 bg-white dark:bg-slate-700 dark:text-slate-200 border border-gray-300 dark:border-slate-600 rounded' rows={8} value={profileData.about} />
                                    : profileData.about
                            }
                        </p>
                    </div>

                    <p className='text-gray-600 dark:text-slate-400 font-medium mt-4'>
                        Appointment fee: <span className='text-gray-800 dark:text-slate-200'>{currency} {isEdit ? <input type='number' onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} value={profileData.fees} className='bg-white dark:bg-slate-700 dark:text-slate-200 border border-gray-300 dark:border-slate-600 rounded px-2' /> : profileData.fees}</span>
                    </p>

                    <div className='flex gap-2 py-2'>
                        <p className='text-gray-700 dark:text-slate-300'>Address:</p>
                        <p className='text-sm text-gray-600 dark:text-slate-400'>
                            {isEdit ? <input type='text' onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={profileData.address.line1} className='bg-white dark:bg-slate-700 dark:text-slate-200 border border-gray-300 dark:border-slate-600 rounded px-2' /> : profileData.address.line1}
                            <br />
                            {isEdit ? <input type='text' onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={profileData.address.line2} className='bg-white dark:bg-slate-700 dark:text-slate-200 border border-gray-300 dark:border-slate-600 rounded px-2' /> : profileData.address.line2}
                        </p>
                    </div>

                    <div className='flex gap-1 pt-2'>
                        <input type="checkbox" onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))} checked={profileData.available} />
                        <label className='text-gray-700 dark:text-slate-300'>Available</label>
                    </div>

                    {
                        isEdit
                            ? <button onClick={updateProfile} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Save</button>
                            : <button onClick={() => setIsEdit(prev => !prev)} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Edit</button>
                    }

                </div>

                {/* ----- Change Password Section ----- */}
                <div className='flex-1 border border-stone-100 dark:border-slate-700 rounded-lg p-8 py-7 bg-white dark:bg-slate-800 transition-colors'>
                    <div className='flex items-center justify-between'>
                        <p className='text-lg font-medium text-[#262626] dark:text-slate-200'>Change Password</p>
                        <button
                            onClick={() => {
                                setShowPasswordChange(!showPasswordChange)
                                setCurrentPassword('')
                                setNewPassword('')
                                setConfirmPassword('')
                            }}
                            className='px-4 py-1 border border-primary text-sm rounded-full hover:bg-primary hover:text-white transition-all'
                        >
                            {showPasswordChange ? 'Cancel' : 'Change Password'}
                        </button>
                    </div>

                    {showPasswordChange && (
                        <div className='mt-4 flex flex-col gap-3 max-w-sm'>
                            <div>
                                <p className='text-sm text-gray-600 dark:text-slate-400 mb-1'>Current Password</p>
                                <input
                                    type='password'
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className='w-full border border-gray-300 dark:border-slate-600 rounded-lg p-2 text-sm outline-none focus:border-primary bg-white dark:bg-slate-700 dark:text-slate-200'
                                    placeholder='Enter current password'
                                />
                            </div>
                            <div>
                                <p className='text-sm text-gray-600 dark:text-slate-400 mb-1'>New Password</p>
                                <input
                                    type='password'
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className='w-full border border-gray-300 dark:border-slate-600 rounded-lg p-2 text-sm outline-none focus:border-primary bg-white dark:bg-slate-700 dark:text-slate-200'
                                    placeholder='Enter new password (min 8 characters)'
                                />
                            </div>
                            <div>
                                <p className='text-sm text-gray-600 dark:text-slate-400 mb-1'>Confirm New Password</p>
                                <input
                                    type='password'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className='w-full border border-gray-300 dark:border-slate-600 rounded-lg p-2 text-sm outline-none focus:border-primary bg-white dark:bg-slate-700 dark:text-slate-200'
                                    placeholder='Confirm new password'
                                />
                            </div>
                            <button
                                onClick={handleChangePassword}
                                className='px-4 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary/90 transition-all mt-1'
                            >
                                Update Password
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default DoctorProfile
