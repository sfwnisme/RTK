import useSinglePost from '../hooks/use-single-post'
import { Button, ButtonGroup, Form } from 'react-bootstrap'
import Loading from '../components/Loading'
import { useNavigate } from 'react-router-dom'
import withGuard from '../utils/withGuard'
import { useFormik } from 'formik'
import { postSchema } from '../utils/validationSchema'
import { useEditPostMutation } from '../api/apiSlice'

const EditPage = () => {
  const { record, loading, isSuccess, isError, error } = useSinglePost()
  const navigate = useNavigate()

  const [editPost, { isLoading: editingLoading, editingIsError, editingIsSuccess }] = useEditPostMutation()

  const formik = useFormik({
    initialValues: {
      title: record?.title,
      body: record?.body,
    },
    enableReinitialize: true, // re-evaluate the formik funciton
    validationSchema: postSchema,
    onSubmit: (values) => {
      const data = { id: record?.id, title: formik.values.title, body: formik.values.body }
      editPost(data).unwrap().then((response) => {
        console.log('post' + '[' + data.id + ']' + 'edited successfully')
        navigate('/')
      }).catch((error) => {
        console.log('there is an error that occured edit rejecting for post number' + '[' + data.id + ']', error)
      })
    },
  })

  return (
    <>
      <h3>Edit Post No.{record?.id}</h3>
      <Form
        onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Post title</Form.Label>
          <Form.Control
            type="text"
            name='title'
            placeholder="Enter title"
            value={formik.values.title}
            onChange={formik.handleChange}
            isInvalid={!!formik.errors.title}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.title}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Post description</Form.Label>
          <Form.Control
            as="textarea"
            name='body'
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
        <Loading loading={editingLoading} isSuccess={editingIsSuccess} isError={editingIsError} error={'editing error'}>
          <ButtonGroup aria-label="Basic example">
            <Button variant="primary" type="submit" onSubmit={formik.handleSubmit} disabled={!formik.dirty || !formik.isValid} >
              Submit
            </Button>
            <Button variant="danger" type="button" onClick={() => navigate('/')}>
              cancel
            </Button>
          </ButtonGroup>
        </Loading>
      </Form >

    </>
  )
}

export default withGuard(EditPage)