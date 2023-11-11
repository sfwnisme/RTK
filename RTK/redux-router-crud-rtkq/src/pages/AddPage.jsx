import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import RecentPosts from '../components/RecentPosts';
import withGuard from '../utils/withGuard';
import { useFormik } from 'formik'
import { postSchema } from '../utils/validationSchema'
import { useAddPostMutation, useGetUsersQuery } from '../api/apiSlice';

const AddPage = () => {
  const navigate = useNavigate()
  const [addPost, { isLoading: loading, isError, isSuccess }] = useAddPostMutation()


  //===== formik
  const formik = useFormik({
    initialValues: {
      title: '',
      body: '',
      userId: '',
    },
    onSubmit: (values) => {
      const data = {
        title: formik.values.title,
        body: formik.values.body,
        userId: formik.values.userId
      }
      addPost(data).unwrap().then((response) => {
        console.log('new post number [' + response.id + ']', response)
        navigate('/')
      }).catch((error) => {
        console.log('could not adding new post', error)
      })
    },
    validationSchema: postSchema
  })

  //===== users options
  const { data: users } = useGetUsersQuery()
  const userOptions = users?.map((user) => <option value={+user?.id} id={+user?.id} key={+user?.id}>{user?.name}</option>)

  return (
    <div className='add'>
      <h3>Add New Post</h3>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Post title <small>{formik.values.title.length}/50</small></Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="Enter title"
            value={formik?.values?.title}
            onChange={formik?.handleChange}
            isInvalid={!!formik?.errors?.title}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.title}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Post description <small>{formik.values.body.length}/250</small></Form.Label>
          <Form.Control
            as="textarea"
            name="body"
            placeholder="description"
            style={{ height: '100px' }}
            value={formik.values.body}
            onChange={formik.handleChange}
            isInvalid={!!formik.errors.body}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.body}
          </Form.Control.Feedback>
        </Form.Group>
        <Form className="label">User</Form>
        <Form.Select
          name='userId'
          aria-label="Default select example"
          onChange={formik.handleChange} value={formik.values.userId}
          isInvalid={!!formik.errors.body}
        >
          <option>Open this select menu</option>
          {userOptions}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {formik.errors.userId}
        </Form.Control.Feedback>
        <br />
        <Loading loading={loading} isSuccess={isSuccess} error={'ther is an error in AddPage.jsx'} isError={isError}>
          <Button variant="primary" type="submit" onSubmit={formik.handleSubmit} disabled={!formik.dirty || !formik.isValid}>
            Submit
          </Button>
        </Loading>
      </Form>
      <hr />
      <RecentPosts />
    </div>
  )
}


export default withGuard(AddPage)

/** NOTE
 * formik.dirty || formik.isValid => if the boolean values is 
   equal 'false' it returns 'false' if boolean values equal true
   it returns 'true' else boolean values is different will return "false"
 */