/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Passage = ({ props }) => {
  const [clientToken, setClientToken] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/fetch-data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.error_no === 'S00') {
          setClientToken(data.clientToken);
          console.log(data.clientToken)
        } else {
          console.log('Error: Unable to generate token. Please check request parameters.')
        }
      } catch (error) {
        const err = () => {
          toast.error(<div> Error: Unable to connect to the server. Please try again later.</div>, {
            position: toast.POSITION.TOP_RIGHT,
          });
        };
        err();
      }
    };

    fetchData();
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [formValues, setFormValues] = useState({
    phoneNumber: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handlePhoneInputChange = e => {
    const input = e.target.value.replace(/\D/g, ''); // Remove non-digits
    let formattedInput;
    if (input.length < 4) {
      formattedInput = input;
    } else if (input.length < 7) {
      formattedInput = `(${input.slice(0, 3)}) ${input.slice(3)}`;
    } else {
      formattedInput = `(${input.slice(0, 3)}) ${input.slice(3, 6)}-${input.slice(6, 10)}`;
    }
    setFormValues({ ...formValues, phoneNumber: formattedInput });
  };

  const handleCardNumberChange = e => {
    let input = e.target.value.replace(/\D/g, ''); // Allow only digits
    input = input.substring(0, 16); // Limit to 16 digits

    let formattedInput = '';
    // Add spaces after every 4 digits
    for (let i = 0; i < input.length; i++) {
      if (i > 0 && i % 4 === 0) formattedInput += ' '; // Add space
      formattedInput += input.charAt(i);
    }

    setFormValues({ ...formValues, cardNumber: formattedInput });
  };

  const handleExpiryDateChange = e => {
    let input = e.target.value.replace(/\D/g, ''); // Allow only digits
    input = input.substring(0, 4); // Limit length to 4 digits (MMYY)

    if (input.length > 2) {
      input = input.substring(0, 2) + '/' + input.substring(2, 4); // Insert '/' after MM
    }

    setFormValues({ ...formValues, expiryDate: input });
  };
  const validateExpiryDate = value => {
    if (value.length !== 5) return false; // Ensure the format is MM/YY

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100; // Get the last two digits of the year
    const currentMonth = currentDate.getMonth() + 1; // January is 0

    const [month, year] = value.split('/').map(Number); // Convert MM/YY to numbers

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return 'Expiry date cannot be in the past';
    }

    return true;
  };
  const handleCvvChange = e => {
    const input = e.target.value.replace(/\D/g, ''); // Allow only digits
    const trimmedInput = input.substring(0, 3); // Limit to 3 digits

    setFormValues({ ...formValues, cvv: trimmedInput });
  };

  const {
    'data-variant': variant,
    'data-submitText': submitText,
    'data-submitBg': submitBg,
    'data-submitColor': submitColor,
    'data-valorLogo': valorLogo,
    'data-cardholdName': cardholdName,
    'data-defaultCardholderName': defaultCardholderName,
    'data-email': email,
    'data-defaultEmail': defaultEmail,
    'data-phone': phone,
    'data-billingAddress': billingAddress,
    'data-defaultAddress1': defaultAddress1,
    'data-defaultAddress2': defaultAddress2,
    'data-defaultCity': defaultCity,
    'data-defaultState': defaultState,
  } = props;

  const states = [
    { name: 'Alabama', abbreviation: 'AL' },
    { name: 'Alaska', abbreviation: 'AK' },
    { name: 'Arizona', abbreviation: 'AZ' },
    { name: 'Arkansas', abbreviation: 'AR' },
    { name: 'California', abbreviation: 'CA' },
    { name: 'Colorado', abbreviation: 'CO' },
    { name: 'Connecticut', abbreviation: 'CT' },
    { name: 'Delaware', abbreviation: 'DE' },
    { name: 'Florida', abbreviation: 'FL' },
    { name: 'Georgia', abbreviation: 'GA' },
    { name: 'Hawaii', abbreviation: 'HI' },
    { name: 'Idaho', abbreviation: 'ID' },
    { name: 'Illinois', abbreviation: 'IL' },
    { name: 'Indiana', abbreviation: 'IN' },
    { name: 'Iowa', abbreviation: 'IA' },
    { name: 'Kansas', abbreviation: 'KS' },
    { name: 'Kentucky', abbreviation: 'KY' },
    { name: 'Louisiana', abbreviation: 'LA' },
    { name: 'Maine', abbreviation: 'ME' },
    { name: 'Maryland', abbreviation: 'MD' },
    { name: 'Massachusetts', abbreviation: 'MA' },
    { name: 'Michigan', abbreviation: 'MI' },
    { name: 'Minnesota', abbreviation: 'MN' },
    { name: 'Mississippi', abbreviation: 'MS' },
    { name: 'Missouri', abbreviation: 'MO' },
    { name: 'Montana', abbreviation: 'MT' },
    { name: 'Nebraska', abbreviation: 'NE' },
    { name: 'Nevada', abbreviation: 'NV' },
    { name: 'New Hampshire', abbreviation: 'NH' },
    { name: 'New Jersey', abbreviation: 'NJ' },
    { name: 'New Mexico', abbreviation: 'NM' },
    { name: 'New York', abbreviation: 'NY' },
    { name: 'North Carolina', abbreviation: 'NC' },
    { name: 'North Dakota', abbreviation: 'ND' },
    { name: 'Ohio', abbreviation: 'OH' },
    { name: 'Oklahoma', abbreviation: 'OK' },
    { name: 'Oregon', abbreviation: 'OR' },
    { name: 'Pennsylvania', abbreviation: 'PA' },
    { name: 'Rhode Island', abbreviation: 'RI' },
    { name: 'South Carolina', abbreviation: 'SC' },
    { name: 'South Dakota', abbreviation: 'SD' },
    { name: 'Tennessee', abbreviation: 'TN' },
    { name: 'Texas', abbreviation: 'TX' },
    { name: 'Utah', abbreviation: 'UT' },
    { name: 'Vermont', abbreviation: 'VT' },
    { name: 'Virginia', abbreviation: 'VA' },
    { name: 'Washington', abbreviation: 'WA' },
    { name: 'West Virginia', abbreviation: 'WV' },
    { name: 'Wisconsin', abbreviation: 'WI' },
    { name: 'Wyoming', abbreviation: 'WY' },
  ];

  //Modal for data-variant lightbox
  const [showModal, setShowModal] = useState(false);
  const Modal = ({ show, onClose, children }) => {
    if (!show) {
      return null;
    }
    const handleBackdropClick = () => {
      onClose();
    };
    const handleContentClick = event => {
      event.stopPropagation();
    };
    return (
      <div style={modalStyle} onClick={handleBackdropClick}>
        <div style={modalContentStyle} onClick={handleContentClick}>
          {children}
        </div>
      </div>
    );
  };
  const modalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  const modalContentStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '5px',
  };

  const onSubmit = async data => {
    try {
      const response = await fetch('http://localhost:3001/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, clientToken }), // Send data along with clientToken
      });

      const responseData = await response.json();
      if (response.ok) {
        await performSale(responseData.cardToken, data);
      } else {
        const error = () => {
          toast.error(<div>Error: Unable to verify card details.</div>, {
            position: toast.POSITION.TOP_RIGHT,
          });
        };
        error();
      }
    } catch (error) {
      const err = () => {
        toast.error(<div> Error: Unable to connect to the server. Please try again later.</div>, {
          position: toast.POSITION.TOP_RIGHT,
        });
      };
      err();
    }
  };

  //Call Sale API
  const performSale = async (cardToken, saleData) => {
    const saleDetails = {
      txn_type: 'sale',
      token: cardToken,
      amount: '5.00',
      surchargeIndicator: '0',
      surchargeAmount: '5.00',
      phone: saleData.phone,
      address1: saleData.address1,
      address2: saleData.address2,
      city: saleData.city,
      state: 'NY',
      shipping_country: 'US',
      billing_country: 'US',
      zip: saleData.zip,
      email: saleData.email,
    };

    try {
      const response = await fetch('http://localhost:3001/sale-api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(saleDetails),
      });

      const responseData = await response.json();
      if (response.ok) {
        const success = () => {
          toast.success(
            <div>
              Payment Successful
              <br />
              Tran No: {responseData.tran_no}
              <br />
              Approval Code: {responseData.approval_code}
              <br />
              Transaction Status: {responseData.msg}
            </div>,
            {
              position: toast.POSITION.TOP_RIGHT,
            }
          );
        };
        success();
      } else {
        const error = () => {
          toast.error(<div>Error: Unable to make payment.</div>, {
            position: toast.POSITION.TOP_RIGHT,
          });
        };
        error();
      }
    } catch (error) {
      const err = () => {
        toast.error(<div> Error: Unable to connect to the server. Please try again later.</div>, {
          position: toast.POSITION.TOP_RIGHT,
        });
      };
      err();
    }
  };

  return (
    <>
      <ToastContainer />
      {variant !== 'lightbox' ? (
        //inline attribute style
        <form onSubmit={handleSubmit(onSubmit)}>
            {valorLogo && <img src='https://valorpaytech.com/wp-content/uploads/2019/11/Valor_PayTech_Logo_Medium.png' alt='' />}
            {/* Email input */}
            {email && (
              <>
                <div className='form-group'>
                  <label>Email</label>
                  <input type='email' className='form-control' {...register('email', { required: 'Email is required', pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Invalid email format' } })} placeholder={defaultEmail || 'Email'} />
                  {errors.email && <span style={{ color: '#fc5a4e' }}>{errors.email.message}</span>}
                </div>
              </>
            )}
            {/* Phone input */}
            {phone && (
              <>
                <div className='form-group'>
                  <label>Phone</label>
                  <input
                    type='tel'
                    className='form-control'
                    {...register('phone', {
                      required: 'Phone is required',
                      pattern: {
                        value: /^\(\d{3}\) \d{3}-\d{4}$/,
                        message: 'Invalid phone format',
                      },
                    })}
                    value={formValues.phoneNumber}
                    onChange={handlePhoneInputChange}
                    placeholder={'XXX-XXX-XXXX'}
                  />
                  {errors.phone && <span style={{ color: '#fc5a4e' }}>{errors.phone.message}</span>}
                </div>
              </>
            )}
            {/* Billing Address section */}
            {billingAddress && (
              <>
                <div className='form-section'>
                  <label>Billing Address</label>
                  <div className='form-group'>
                    <input type='text' className='form-control' {...register('address1', { required: 'Address line 1 is required' })} placeholder={defaultAddress1 || 'Address line 1'} />
                    {errors.address1 && <span style={{ color: '#fc5a4e' }}>{errors.address1.message}</span>}
                  </div>
                  <div className='form-group'>
                    <input type='text' className='form-control' {...register('address2')} placeholder={defaultAddress2 || 'Address line 2'} />
                  </div>
                  <div className='form-row'>
                    <div className='form-group half-width'>
                      <input type='text' className='form-control' {...register('city', { required: 'City is required' })} placeholder={defaultCity || 'City'} />
                      {errors.city && <span style={{ color: '#fc5a4e' }}>{errors.city.message}</span>}
                    </div>
                    <div className='form-group half-width'>
                      <select className='form-control' {...register('state', { required: 'State is required' })} defaultValue={defaultState || ''}>
                        <option value='' disabled>
                          Select State
                        </option>
                        {states.map(state => (
                          <option key={state.abbreviation} value={state.abbreviation}>
                            {state.name}
                          </option>
                        ))}
                      </select>
                      {errors.state && <span style={{ color: '#fc5a4e' }}>{errors.state.message}</span>}
                    </div>
                  </div>
                  <div className='form-group'>
                    <input type='text' className='form-control' {...register('zip', { required: 'Zip Code is required', pattern: { value: /^\d{5}(-\d{4})?$/, message: 'Invalid zip code format' } })} placeholder='Zip Code' />
                    {errors.zip && <span style={{ color: '#fc5a4e' }}>{errors.zip.message}</span>}
                  </div>
                </div>
              </>
            )}
            {/* Card Information section */}
            <div className='form-section'>
              <label>Card Information</label>
              <div className='form-group'>
                <input
                  type='text'
                  className='form-control'
                  {...register('cardNumber', {
                    required: 'Card Number is required',
                    pattern: {
                      value: /^(\d{4} ){3}\d{4}$/,
                      message: 'Invalid card number format',
                    },
                  })}
                  value={formValues.cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder='Card Number'
                />
                {errors.cardNumber && <span style={{ color: '#fc5a4e' }}>{errors.cardNumber.message}</span>}
              </div>
              <div className='form-row'>
                <div className='form-group half-width'>
                  <input
                    type='text'
                    className='form-control'
                    {...register('expiryDate', {
                      required: 'Expiry date is required',
                      pattern: {
                        value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                        message: 'Invalid expiry date format',
                      },
                      validate: validateExpiryDate,
                    })}
                    value={formValues.expiryDate}
                    onChange={handleExpiryDateChange}
                    placeholder='MM/YY'
                  />
                  {errors.expiryDate && <span style={{ color: '#fc5a4e' }}>{errors.expiryDate.message}</span>}
                </div>
                <div className='form-group half-width'>
                  <input
                    type='text'
                    className='form-control'
                    {...register('cvv', {
                      required: 'CVV is required',
                      pattern: {
                        value: /^\d{3}$/,
                        message: 'Invalid CVV format. Must be 3 digits.',
                      },
                    })}
                    value={formValues.cvv}
                    onChange={handleCvvChange}
                    placeholder='CVV'
                  />
                  {errors.cvv && <span style={{ color: '#fc5a4e' }}>{errors.cvv.message}</span>}
                </div>
              </div>
            </div>
            {/* Card Name */}
            {cardholdName && (
              <>
                <div className='form-group'>
                  <label>Name on Card</label>
                  <input type='text' className='form-control' {...register('cardholderName', { required: 'Name on card is required' })} placeholder={defaultCardholderName || 'Name on Card'} />
                  {errors.cardholderName && <span style={{ color: '#fc5a4e' }}>{errors.cardholderName.message}</span>}
                </div>
              </>
            )}
            {/* Agreement checkbox */}
            <div className='form-group'>
              <label className='policy'>
                <input type='checkbox' {...register('agreement', { required: 'You must agree to the terms' })} /> I agree to the Valor Payments Terms of Service &amp;{' '}
                <a href='https://valorpaytech.com/privacy-policy/' target='_blank' rel='noopener noreferrer' style={{ textDecoration: 'underline', color: 'blue' }}>
                  Privacy Policy.
                </a>
              </label>
              {errors.agreement && <div style={{ color: '#fc5a4e', marginTop: '8px' }}>{errors.agreement.message}</div>}
            </div>
            {/* Submit button */}
            <div className='form-group'>
              <button
                type='submit'
                className='submit-button'
                style={{
                  backgroundColor: submitBg || '#0000FF',
                  color: submitColor || '#FFFFFF',
                }}>
                {submitText || 'Buy Now'}
              </button>
            </div>
        </form>
      ) : (
        //lightbox attribute style
        <form onSubmit={handleSubmit(onSubmit)} style={{ backgroundColor: '#fff' }}>
          <div className='form-container'>
            {valorLogo && <img src='https://valorpaytech.com/wp-content/uploads/2019/11/Valor_PayTech_Logo_Medium.png' alt='' />}
            {/* Email input */}
            {email && (
              <>
                <div className='form-group'>
                  <label>Email</label>
                  <input type='email' className='form-control' {...register('email', { required: 'Email is required', pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Invalid email format' } })} placeholder={defaultEmail || 'Email'} />
                  {errors.email && <span style={{ color: '#fc5a4e' }}>{errors.email.message}</span>}
                </div>
              </>
            )}
            {/* Phone input */}
            {phone && (
              <>
                <div className='form-group'>
                  <label>Phone</label>
                  <input
                    type='tel'
                    className='form-control'
                    {...register('phone', {
                      required: 'Phone is required',
                      pattern: {
                        value: /^\(\d{3}\) \d{3}-\d{4}$/,
                        message: 'Invalid phone format',
                      },
                    })}
                    value={formValues.phoneNumber}
                    onChange={handlePhoneInputChange}
                    placeholder={'xxx xxxx xxxx'}
                  />
                  {errors.phone && <span style={{ color: '#fc5a4e' }}>{errors.phone.message}</span>}
                </div>
              </>
            )}
            {/* Billing Address section */}
            {billingAddress && (
              <>
                <div className='form-section'>
                  <label>Billing Address</label>
                  <div className='form-group'>
                    <input type='text' className='form-control' {...register('address1', { required: 'Address line 1 is required' })} placeholder={defaultAddress1 || 'Address line 1'} />
                    {errors.address1 && <span style={{ color: '#fc5a4e' }}>{errors.address1.message}</span>}
                  </div>
                  <div className='form-group'>
                    <input type='text' className='form-control' {...register('address2')} placeholder={defaultAddress2 || 'Address line 2'} />
                  </div>
                  <div className='form-row'>
                    <div className='form-group half-width'>
                      <input type='text' className='form-control' {...register('city', { required: 'City is required' })} placeholder={defaultCity || 'City'} />
                      {errors.city && <span style={{ color: '#fc5a4e' }}>{errors.city.message}</span>}
                    </div>
                    <div className='form-group half-width'>
                      <select className='form-control' {...register('state', { required: 'State is required' })} defaultValue={defaultState || ''}>
                        <option value='' disabled>
                          Select State
                        </option>
                        {states.map(state => (
                          <option key={state.abbreviation} value={state.abbreviation}>
                            {state.name}
                          </option>
                        ))}
                      </select>
                      {errors.state && <span style={{ color: '#fc5a4e' }}>{errors.state.message}</span>}
                    </div>
                  </div>
                  <div className='form-group'>
                    <input type='text' className='form-control' {...register('zip', { required: 'Zip Code is required', pattern: { value: /^\d{5}(-\d{4})?$/, message: 'Invalid zip code format' } })} placeholder='Zip Code' />
                    {errors.zip && <span style={{ color: '#fc5a4e' }}>{errors.zip.message}</span>}
                  </div>
                </div>
              </>
            )}
            {/* Submit button */}
            <div className='form-group'>
              <button
                type='button'
                className='submit-button'
                onClick={() => setShowModal(true)}
                style={{
                  backgroundColor: { submitBg } || '#0000FF',
                  color: { submitColor } || '#FFFFFF',
                }}>
                Pay Now
              </button>
            </div>
            <div>
              <Modal show={showModal} onClose={() => setShowModal(false)}>
                {/* Card Information section */}
                <div className='form-section'>
                  <label>Card Information</label>
                  <div className='form-group'>
                    <input
                      type='text'
                      className='form-control'
                      {...register('cardNumber', {
                        required: 'Card Number is required',
                        pattern: {
                          value: /^(\d{4} ){3}\d{4}$/,
                          message: 'Invalid card number format',
                        },
                      })}
                      value={formValues.cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder='Card Number'
                    />
                    {errors.cardNumber && <span style={{ color: '#fc5a4e' }}>{errors.cardNumber.message}</span>}
                  </div>
                  <div className='form-row'>
                    <div className='form-group half-width'>
                      <input
                        type='text'
                        className='form-control'
                        {...register('expiryDate', {
                          required: 'Expiry date is required',
                          pattern: {
                            value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                            message: 'Invalid expiry date format',
                          },
                          validate: validateExpiryDate,
                        })}
                        value={formValues.expiryDate}
                        onChange={handleExpiryDateChange}
                        placeholder='MM/YY'
                      />
                      {errors.expiryDate && <span style={{ color: '#fc5a4e' }}>{errors.expiryDate.message}</span>}
                    </div>
                    <div className='form-group half-width'>
                      <input
                        type='text'
                        className='form-control'
                        {...register('cvv', {
                          required: 'CVV is required',
                          pattern: {
                            value: /^\d{3}$/,
                            message: 'Invalid CVV format. Must be 3 digits.',
                          },
                        })}
                        value={formValues.cvv}
                        onChange={handleCvvChange}
                        placeholder='CVV'
                      />
                      {errors.cvv && <span style={{ color: '#fc5a4e' }}>{errors.cvv.message}</span>}
                    </div>
                  </div>
                </div>
                {/* Card Name */}
                {cardholdName && (
                  <>
                    <div className='form-group'>
                      <label>Name on Card</label>
                      <input type='text' className='form-control' {...register('cardholderName', { required: 'Name on card is required' })} placeholder={defaultCardholderName || 'Name on Card'} />
                      {errors.cardholderName && <span style={{ color: '#fc5a4e' }}>{errors.cardholderName.message}</span>}
                    </div>
                    <br />
                  </>
                )}
                {/* Agreement checkbox */}
                <div className='form-group'>
                  <label className='policy'>
                    <input type='checkbox' {...register('agreement', { required: 'You must agree to the terms' })} /> I agree to the Valor Payments Terms of Service &amp;{' '}
                    <a href='https://valorpaytech.com/privacy-policy/' target='_blank' rel='noopener noreferrer' style={{ textDecoration: 'underline', color: 'blue' }}>
                      Privacy Policy.
                    </a>
                  </label>
                  {errors.agreement && <div style={{ color: '#fc5a4e', marginTop: '8px' }}>{errors.agreement.message}</div>}
                </div>
                {/* Submit button */}
                <div className='form-group'>
                  <button
                    type='submit'
                    className='submit-button'
                    style={{
                      backgroundColor: { submitBg } || '#ff7369',
                      color: { submitColor } || '#FFFFFF',
                    }}>
                    {submitText || 'Buy Now'}
                  </button>
                </div>
                <br/>
                {/* Cancel button */}
                <div className='form-group'>
                  <button
                    type='text'
                    className='submit-button'
                    onClick={() => setShowModal(false)}
                    style={{
                      backgroundColor: '#fc5a4e',
                      color: '#FFFFFF',
                    }}>
                    Cancel
                  </button>
                </div>
              </Modal>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default Passage;