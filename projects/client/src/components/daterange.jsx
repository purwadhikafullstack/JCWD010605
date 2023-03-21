import { Row, Col, Button, Form, InputGroup } from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';
import { DateRange } from 'react-date-range';

import { FaCalendarAlt } from 'react-icons/fa';
import format from 'date-fns/format';
import { addDays } from 'date-fns';
import '../css/style.css';

export default function RangeDate() {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 6),
      // minDate: new Date(),
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
      <Form>
        <Row className="mb-3">
          <Form.Group className="" xs="12" as={Col} controlId="formGridState">
            <Form.Label className="m-0">Destination</Form.Label>
            <Form.Select id="infocus" defaultValue="Choose...">
              <option>Choose...</option>
              <option>...</option>
            </Form.Select>
          </Form.Group>
        </Row>

        <Row className="mb-3 ">
          <Col xs="6" className="">
            <Form.Label className="m-0">Check-in</Form.Label>
            <InputGroup className="mb-3  ">
              <InputGroup.Text id="basic-addon1" className="px-2 bg-white border-2 border-end-0">
                <FaCalendarAlt />
              </InputGroup.Text>
              <Form.Control
                id="infocus"
                className="rounded-end px-0 border-start-0 "
                aria-label="Check-in"
                aria-describedby="basic-addon1"
                value={`${format(range[0].startDate, 'MM/dd/yyyy')}`}
                readOnly
                onClick={() => setOpen((open) => !open)}
              />
              <div className="mt-1" ref={refOne}>
                {open && (
                  <DateRange
                    className="cus-shadow position-absolute start-0 top-100 mt-1"
                    onChange={(item) => setRange([item.selection])}
                    showDateDisplay={false}
                    editableDateInputs={true}
                    moveRangeOnFirstSelection={false}
                    ranges={range}
                    months={2}
                    minDate={new Date()}
                    direction="horizontal"
                  />
                )}
              </div>
            </InputGroup>
          </Col>
          <Col xs="6">
            <Form.Label className="m-0">Check-out</Form.Label>
            <InputGroup className="mb-3 ">
              <InputGroup.Text id="basic-addon1" className="ps-2 pe-1 bg-white border-2 border-end-0">
                <FaCalendarAlt />
              </InputGroup.Text>
              <Form.Control id="infocus" aria-label="Check-out" aria-describedby="basic-addon1" className="px-0 border-start-0" value={` ${format(range[0].endDate, 'MM/dd/yyyy')}`} readOnly onClick={() => setOpen((open) => !open)} />
            </InputGroup>
          </Col>
        </Row>

        <Row className="mx-auto">
          <Button className="" variant="light" id="btn-tan" type="submit">
            Submit
          </Button>
        </Row>
      </Form>
    </>
  );
}
