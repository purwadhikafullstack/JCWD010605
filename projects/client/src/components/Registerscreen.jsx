import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import '../css/Registerscreen.css';
import { BsFillEnvelopeFill, BsFillPersonFill, BsFillKeyFill, BsFillLockFill, BsFillEyeSlashFill, BsFillEyeFill } from 'react-icons/bs';
import { BiMaleFemale, BiPhone, BiCalendar, BiImage } from 'react-icons/bi';
import * as Yup from 'yup';
import YupPassword from 'yup-password';
import { useFormik } from 'formik';

function Registerscreen() {
  YupPassword(Yup);

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const [conPasswordShown, setConPasswordShown] = useState(false);
  const toggleConPasswordVisiblity = () => {
    setConPasswordShown(conPasswordShown ? false : true);
  };

  const { formik, values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      id: 0,
      fullName: '',
      email: '',
      password: '',
      phoneNumber: '',
      gender: '',
      birthDate: '',
      profilImage: '',
    },
    validationSchema: Yup.object().shape({
      fullName: Yup.string().required('nama tidak boleh kosong').min(3, 'min 3 huruf'),
      email: Yup.string().required('email tidak boleh kosong').email('ini bukan email'),
      password: Yup.string().required('password tidak boleh kosong').minLowercase(1, 'min 1 huruf kecil').minNumbers(1, 'min 1 angka').minUppercase(1, 'min 1 huruf besar').min(5, 'min 5 digit'),
      confirmPassword: Yup.string()
        .required('password must match')
        .oneOf([Yup.ref('password'), null], 'password must match'),
      phoneNumber: Yup.string().required('phone number tidak boleh kosong').minNumbers(8, 'masukkan nomor telepon anda'), 
      gender: Yup.string().required('gender tidak boleh kosong'),
      birthDate: Yup.string().required('birthdate tidak boleh kosong'),
      profilImage: Yup.string().required('profil image tidak boleh kosong'),
    }),
  });

  return (
    <div className="wrapper h-full color">
      <div className="row justify-content-center ">
        <div className="col-md-5">
          <div className="shadow-lg jarak mt-5 bg-light">
            <h2>Register</h2>

            <form onSubmit={handleSubmit} className="d-grid gap-2">
              <div className="form-group input-group">
                <div className="input-group-text">
                  <BsFillPersonFill />
                </div>
                <input className={errors.fullName && touched.fullName ? ' input-error form-control' : 'form-control'} value={values.fullName} onChange={handleChange} onBlur={handleBlur} id="fullName" placeholder="Full Name" type="text" />
              </div>
              {errors.fullName && touched.fullName && <p className="text-danger error my-0">{errors.fullName}</p>}

              <div className="form-group input-group">
                <div className="input-group-prepend"></div>
                <div className="input-group-text">
                  <BsFillEnvelopeFill />
                </div>
                <input className={errors.email && touched.email ? ' input-error form-control' : 'form-control'} value={values.email} onChange={handleChange} onBlur={handleBlur} id="email" placeholder="Email Address" type="email" />
              </div>
              {errors.email && touched.email && <p className="text-danger error my-0">{errors.email}</p>}

              <div className="form-group input-group">
                <div className="input-group-prepend"></div>
                <div className="input-group-text">
                  <BsFillKeyFill />
                </div>
                <input
                  type={passwordShown ? 'text' : 'password'}
                  id="password"
                  placeholder="Password"
                  className={errors.password && touched.password ? ' input-error form-control' : 'form-control'}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="input-group-text" onClick={togglePasswordVisiblity}>
                  {passwordShown ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
                </div>
              </div>
              {errors.password && touched.password && <p className="text-danger error my-0">{errors.password}</p>}

              <div className="form-group input-group">
                <div className="input-group-prepend"></div>
                <div className="input-group-text">
                  <BsFillLockFill />
                </div>
                <input
                  type={conPasswordShown ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  id="confirmPassword"
                  className={errors.confirmPassword && touched.confirmPassword ? ' input-error form-control' : 'form-control'}
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="input-group-text" onClick={toggleConPasswordVisiblity}>
                  {conPasswordShown ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
                </div>
              </div>
              {errors.confirmPassword && touched.confirmPassword && <p className="text-danger error my-0">{errors.confirmPassword}</p>}

              <div className="form-group input-group">
                <div className="input-group-text">
                  <BiPhone />
                </div>
                <input
                  id="phoneNumber"
                  placeholder="Phone Number"
                  type="text"
                  className={errors.phoneNumber && touched.phoneNumber ? ' input-error form-control' : 'form-control'}
                  value={values.phoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              {errors.phoneNumber && touched.phoneNumber && <p className="text-danger error my-0">{errors.phoneNumber}</p>}

              <div className="form-group input-group">
                <div className="input-group-text">
                  <BiMaleFemale />
                </div>
                <Form.Select aria-label="select-gender" className={errors.gender && touched.gender ? ' input-error form-control' : 'form-control'} onSelect={handleChange} onBlur={handleBlur}>
                  <option>Select Gender</option>
                  <option value={values.gender}>Male</option>
                  <option value={values.gender}>Female</option>
                </Form.Select>
              </div>
              {errors.gender && touched.gender && <p className="error my-0">{errors.gender}</p>}

              <div className="form-group input-group">
                <div className="input-group-text"><BiCalendar/> Birth Date</div>
                <input type="date" id="birthdate"
                  className={errors.birthDate && touched.birthDate ? ' input-error form-control' : 'form-control'} onSelect={handleChange} onBlur={handleBlur}/>
                </div>
                {/* <div className="text-danger">{formik.errors.birthDate}</div> */}
                {errors.birthDate && touched.birthDate && <p className="text-danger error my-0">{errors.birthDate}</p>}

              <div className="form-group input-group">
                <div className="input-group-text"><BiImage/></div>
                <input type="file" id="profilImage"
                  className={errors.profilImage && touched.profilImage ? ' input-error form-control' : 'form-control'} onSelect={handleChange} onBlur={handleBlur}/>
                </div>
                {/* <div className="text-danger">{formik.errors.profilImage}</div> */}
                {errors.profilImage && touched.profilImage && <p className="text-danger error my-0">{errors.profilImage}</p>}

              <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block">
                  {' '}
                  Create Account{' '}
                </button>
              </div>
              <p className="text-center">
                Have an account? <a href="">Log In</a>{' '}
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registerscreen;