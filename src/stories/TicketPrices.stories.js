import TicketPrices from "../components/TicketPrices";

export default {
  title: "TicketPrices/Table",
  component: TicketPrices,
  parameters: {
    backgrounds: {
      default: "default",
      values: [{ name: "default", value: "#272822" }],
    },
  },
};

const Template = (args) => <TicketPrices {...args} />;

export const Table = Template.bind({});
Table.args = {};
