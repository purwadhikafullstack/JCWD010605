import { Row, Col, Button } from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';
import { DateRange } from 'react-date-range';

import format from 'date-fns/format';
import { addDays } from 'date-fns';
import { Form } from 'react-bootstrap';

export default function RangeDate() {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 6),
      key: 'selection',
    },
  ]);

  const [open, setOpen] = useState(false);

  const refOne = useRef(null);

  useEffect(() => {
    document.addEventListener('keydown', hideOnEscape, true);
    document.addEventListener('click', hideOnClickOutside, true);
  }, []);

  const hideOnEscape = (e) => {
    console.log(e.key);
    if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  return (
    <>
      <Form className="">
        <Row className="mb-3 ">
          <Form.Group className="" xs="10" as={Col} controlId="formGridState">
            <Form.Label>Destination</Form.Label>
            <Form.Select defaultValue="Choose...">
              <option>Choose...</option>
              <option>...</option>
            </Form.Select>
          </Form.Group>
        </Row>

        <Row className="mb-3 ">
          <Col xs="5">
            <Form.Label>Checkin</Form.Label>
            <Form.Control className="" value={`${format(range[0].startDate, 'MM/dd/yyyy')}`} readOnly onClick={() => setOpen((open) => !open)} />

            <div className="mt-2 position-absolute translate-middle-x start-50" ref={refOne}>
              {open && <DateRange onChange={(item) => setRange([item.selection])} showDateDisplay={false} editableDateInputs={true} moveRangeOnFirstSelection={false} ranges={range} months={2} direction="horizontal" />}
            </div>
          </Col>
          <Col xs="5">
            <Form.Label>Checkout</Form.Label>
            <Form.Control className=" " value={` ${format(range[0].endDate, 'MM/dd/yyyy')}`} readOnly onClick={() => setOpen((open) => !open)} />
          </Col>
        </Row>

        <Button className="" variant="primary" type="submit">
          Submit
        </Button>
        <Row className=""></Row>
      </Form>
      {/* <div>
        <input value={`${format(range[0].startDate, 'MM/dd/yyyy')}`} readOnly onClick={() => setOpen((open) => !open)} />

        <input value={`${format(range[0].endDate, 'MM/dd/yyyy')}`} readOnly onClick={() => setOpen((open) => !open)} />

        <div ref={refOne}>{open && <DateRange onChange={(item) => setRange([item.selection])} editableDateInputs={true} moveRangeOnFirstSelection={false} ranges={range} months={2} direction="horizontal" />}</div>
      </div> */}
    </>
  );
}
