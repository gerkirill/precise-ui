import * as React from 'react';
import * as enzyme from 'enzyme';
import { Table } from './';
import { TableBasic } from './TableBasic.part';
import { TableCard } from './TableCard.part';

describe('<Table />', () => {
  it('should render an empty <Table> component', () => {
    const wrapper = enzyme.shallow(<Table mode="table" data={[]} />);
    const nodes = wrapper.filter((node: any) => node.text() !== '');
    expect(nodes.exists()).toBeFalsy();
  });

  it('should render an empty <Table> component with card mode', () => {
    const wrapper = enzyme.shallow(<Table mode="card" data={[]} />);
    const nodes = wrapper.filter((node: any) => node.text() !== '');
    expect(nodes.exists()).toBeFalsy();
  });

  it('should render <TableBasic> with table mode', () => {
    const wrapper = enzyme.mount(<Table mode="table" data={[]} />);
    expect(wrapper.find(TableBasic).length > 0).toBeTruthy();
  });

  it('should render <TableCard> with card mode', () => {
    const wrapper = enzyme.mount(<Table mode="card" data={[]} />);
    expect(wrapper.find(TableCard).length > 0).toBeTruthy();
  });

  it('should render a <Table> component with right columns', () => {
    const wrapper = enzyme.shallow(<Table mode="table" data={[{ c: 5 }, { c: 10 }]} columns={{ c: 'C' }} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a <Table> component with wrong columns', () => {
    const wrapper = enzyme.shallow(<Table mode="table" data={[{ c: 5 }, { c: 10 }]} columns={{ a: 'A', b: 'B' }} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a <Table> component with sorted data', () => {
    const wrapper = enzyme.shallow(<Table mode="table" data={[{ c: 15 }, { c: 10 }]} sortBy="c" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a <Table> component without headers', () => {
    const wrapper = enzyme.shallow(<Table mode="table" data={[{ c: 15 }, { c: 10 }]} noHeader />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a <Table> component without data and custom placeholder', () => {
    const wrapper = enzyme.shallow(<Table mode="table" data={[]} placeholder="No data" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render cells with the default renderer with table mode', () => {
    const data = [
      {
        name: {
          first: 'First',
          last: 'Entry',
        },
        age: 21,
      },
      {
        name: {
          first: 'Last',
          last: 'Entry',
        },
        age: 25,
      },
    ];
    const columns = {
      name: 'Name',
      age: 'Age',
    };
    const wrapper = enzyme.shallow(<Table mode="table" data={data} columns={columns} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render cells with a custom renderer with table mode', () => {
    const data = [
      {
        name: {
          first: 'First',
          last: 'Entry',
        },
        age: 21,
      },
      {
        name: {
          first: 'Last',
          last: 'Entry',
        },
        age: 25,
      },
    ];
    const columns = {
      name: 'Name',
      age: 'Age',
    };
    const render = e => {
      const value = e.value;

      if (e.key !== 'name') {
        return value;
      }

      return (
        <div>
          <span>{value.first}</span> <strong>{value.last}</strong>
        </div>
      );
    };
    const wrapper = enzyme.shallow(<Table mode="table" data={data} columns={columns} cellRenderer={render} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render cells with the default renderer with card mode', () => {
    const data = [
      {
        name: {
          first: 'First',
          last: 'Entry',
        },
        age: 21,
      },
      {
        name: {
          first: 'Last',
          last: 'Entry',
        },
        age: 25,
      },
    ];
    const columns = {
      name: 'Name',
      age: 'Age',
    };
    const wrapper = enzyme.shallow(<Table mode="card" data={data} columns={columns} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render cells with a custom renderer with card mode', () => {
    const data = [
      {
        name: {
          first: 'First',
          last: 'Entry',
        },
        age: 21,
      },
      {
        name: {
          first: 'Last',
          last: 'Entry',
        },
        age: 25,
      },
    ];
    const columns = {
      name: 'Name',
      age: 'Age',
    };
    const render = e => {
      const value = e.value;

      if (e.key !== 'name') {
        return value;
      }

      return (
        <div>
          <span>{value.first}</span> <strong>{value.last}</strong>
        </div>
      );
    };
    const wrapper = enzyme.shallow(<Table mode="card" data={data} columns={columns} cellRenderer={render} />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('onSort', () => {
    it('should trigger the passed callback when clicking the header', () => {
      const onSortCallback = jest.fn();
      const wrapper = enzyme.mount(<Table data={[{ c: 5 }, { c: 10 }]} onSort={onSortCallback} />);
      wrapper.find('th').simulate('click');

      expect(onSortCallback).toHaveBeenCalledTimes(1);
    });

    it('should pass the columnName and the order to the callback ', () => {
      const onSortCallback = jest.fn();
      const wrapper = enzyme.mount(<Table data={[{ c: 5 }, { c: 10 }]} onSort={onSortCallback} />);
      wrapper.find('th').simulate('click');

      expect(onSortCallback).toHaveBeenCalledWith({
        column: 0,
        key: 'c',
        order: 'ascending',
      });
    });
  });
});
