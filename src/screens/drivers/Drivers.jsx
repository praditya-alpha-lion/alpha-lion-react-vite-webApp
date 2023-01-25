import Error from "../../components/utilities/Error";
import Loading from "../../components/utilities/Loading";
import { useGetDriversQuery } from "../../store/services/alphaTruckingApi";
import React, { useEffect, useRef, useState } from "react";
import getAllDriverData from "../../store/LocalAPi/getAllDrivers.json";
import { useForm } from "react-hook-form";
import { handleToggleMainSideBar } from "../../store/features/globalStateManagementSlice";
import { useSelector } from "react-redux";
import { Table } from "antd";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => {
      // console.log(a);
      return a.name > b.name ? 1 : -1;
    },
    fixed: "left",
  },
  {
    title: "Phone",
    dataIndex: "phone",
  },
  {
    title: "DL",
    key: "dl",
    dataIndex: "dl",
    width: "400px",
    render: (DL) => (
      <div className='flex overflow-x-scroll gap-1  max-w-[400px]'>
        {DL.map((img, i) => (
          <img
            className='h-[100px]'
            key={i}
            // width={50}
            height={100}
            src={img?.url}
            style={{ objectFit: "contain" }}
            // src={img?.thumbnails?.large?.url}
          />
        ))}
      </div>
    ),
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
  },
  {
    title: "DL Number",
    key: "dlNumber",
    dataIndex: "dlNumber",
  },
  {
    title: "State",
    key: "state",
    dataIndex: "state",
  },
  {
    title: "License EXP",
    key: "licenseExp",
    dataIndex: "licenseExp",
  },
  {
    title: "SSN",
    key: "SSN",
    dataIndex: "snn",
  },
  {
    title: "Bank",
    key: "Bank",
    dataIndex: "bank",
  },
  {
    title: "Account",
    key: "Account",
    dataIndex: "account",
  },
  {
    title: "Routing",
    key: "Routing",
    dataIndex: "routing",
  },
  {
    title: "DOB",
    key: "DOB",
    dataIndex: "DOB",
  },
  {
    title: "Application",
    key: "Application",
    dataIndex: "application",
    render: (application) => (
      <div className='flex overflow-x-scroll gap-1  max-w-[400px]'>
        {console.log(application)}
        {application.map((img, i) => (
          <img
            className='h-[100px]'
            key={i}
            // width={50}
            height={100}
            src={img?.thumbnails?.large?.url}
            style={{ objectFit: "contain" }}
            // src={img?.thumbnails?.large?.url}
          />
        ))}
      </div>
    ),
  },
];
const tableData = [];
const defaultExpandable = {
  expandedRowRender: (record) => <p>{record.description}</p>,
};

const defaultFooter = () => "Here is footer";

const Drivers = () => {
  const { toggle, width } = useSelector(
    (state) => state.globalStateManagement.mainSideBar
  );
  console.log(toggle, width);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  const defaultTitle = () => {
    return (
      <div className='flex bg-red-300'>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          <input defaultValue='test' {...register("example")} />

          {/* include validation with required or other standard HTML validation rules */}
          <input {...register("exampleRequired", { required: true })} />
          {/* errors will return when field validation fails  */}
          {errors.exampleRequired && <span>This field is required</span>}

          <input type='submit' />
        </form>
      </div>
    );
  };

  console.log(watch("example"));
  // const { data, error, isFetching } = useGetDriversQuery();
  const refContainer = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (refContainer.current) {
      setDimensions({
        width: refContainer.current.offsetWidth,
        height: refContainer.current.offsetHeight,
      });
    }
  }, []);
  const data = getAllDriverData;
  // if (error) return <Error />;
  // if (!isFetching) {
  data.map((ele, index) => {
    tableData.push({
      key: ele.id || index,
      name: ele?.data?.Name || "N/A",
      phone: ele?.data?.Phone || "N/A",
      dl: ele?.data?.DL || [],
      status: ele?.data?.Status,
      dlNumber: ele?.data?.["DL #"] || "N/A",
      state: ele?.data?.State || "N/A",
      licenseExp: ele?.data?.["License EXP"] || "N/A",
      snn: ele?.data?.["SSN"] || "N/A",
      bank: ele?.data?.Bank || "N/A",
      account: ele?.data?.Account || "N/A",
      routing: ele?.data?.Routing || "N/A",
      DOB: ele?.data?.DOB || "N/A",
      application: ele?.data?.Application || [],
    });
  });
  // }
  const tableColumns = columns.map((item) => ({
    ...item,
  }));

  return (
    <div
      ref={refContainer}
      className=' p-2 h-screen relative overflow-scroll transition duration-150 ease-out'>
      <Table
        className={` overflow-scroll rounded-lg `}
        style={{
          width: `${dimensions.width - width}px`,
          backgroundColor: "white",
        }}
        title={defaultTitle}
        columns={tableColumns}
        dataSource={tableData}
        // pagination={{
        //   position: [top, bottom],
        // }}
        // scroll={scroll}
        scroll={{ x: 2500, y: dimensions.height - 143 }}
        bordered
        // loading={isFetching}
        // dataSource={!isFetching ? tableData : []}
      />
    </div>
  );
};
export default Drivers;

// {
//   /* <Form
//   layout='inline'
//   className='components-table-demo-control-bar'
//   style={{
//     marginBottom: 16,
//   }}>
//   <Form.Item label='Bordered'>
//     <Switch checked={bordered} onChange={handleBorderChange} />
//   </Form.Item>
//   <Form.Item label='loading'>
//     <Switch checked={loading} onChange={handleLoadingChange} />
//   </Form.Item>
//   <Form.Item label='Title'>
//     <Switch checked={showTitle} onChange={handleTitleChange} />
//   </Form.Item>
//   <Form.Item label='Column Header'>
//     <Switch checked={showHeader} onChange={handleHeaderChange} />
//   </Form.Item>
//   <Form.Item label='Footer'>
//     <Switch checked={showFooter} onChange={handleFooterChange} />
//   </Form.Item>
//   <Form.Item label='Expandable'>
//     <Switch checked={!!expandable} onChange={handleExpandChange} />
//   </Form.Item>
//   <Form.Item label='Checkbox'>
//     <Switch
//       checked={!!rowSelection}
//       onChange={handleRowSelectionChange}
//     />
//   </Form.Item>
//   <Form.Item label='Fixed Header'>
//     <Switch checked={!!yScroll} onChange={handleYScrollChange} />
//   </Form.Item>
//   <Form.Item label='Has Data'>
//     <Switch checked={!!hasData} onChange={handleDataChange} />
//   </Form.Item>
//   <Form.Item label='Ellipsis'>
//     <Switch checked={!!ellipsis} onChange={handleEllipsisChange} />
//   </Form.Item>
//   <Form.Item label='Size'>
//     <Radio.Group value={size} onChange={handleSizeChange}>
//       <Radio.Button value='large'>Large</Radio.Button>
//       <Radio.Button value='middle'>Middle</Radio.Button>
//       <Radio.Button value='small'>Small</Radio.Button>
//     </Radio.Group>
//   </Form.Item>
//   <Form.Item label='Table Scroll'>
//     <Radio.Group value={xScroll} onChange={handleXScrollChange}>
//       <Radio.Button value={undefined}>Unset</Radio.Button>
//       <Radio.Button value='scroll'>Scroll</Radio.Button>
//       <Radio.Button value='fixed'>Fixed Columns</Radio.Button>
//     </Radio.Group>
//   </Form.Item>
//   <Form.Item label='Table Layout'>
//     <Radio.Group value={tableLayout} onChange={handleTableLayoutChange}>
//       <Radio.Button value={undefined}>Unset</Radio.Button>
//       <Radio.Button value='fixed'>Fixed</Radio.Button>
//     </Radio.Group>
//   </Form.Item>
//   <Form.Item label='Pagination Top'>
//     <Radio.Group
//       value={top}
//       onChange={(e) => {
//         setTop(e.target.value);
//       }}>
//       <Radio.Button value='topLeft'>TopLeft</Radio.Button>
//       <Radio.Button value='topCenter'>TopCenter</Radio.Button>
//       <Radio.Button value='topRight'>TopRight</Radio.Button>
//       <Radio.Button value='none'>None</Radio.Button>
//     </Radio.Group>
//   </Form.Item>
//   <Form.Item label='Pagination Bottom'>
//     <Radio.Group
//       value={bottom}
//       onChange={(e) => {
//         setBottom(e.target.value);
//       }}>
//       <Radio.Button value='bottomLeft'>BottomLeft</Radio.Button>
//       <Radio.Button value='bottomCenter'>BottomCenter</Radio.Button>
//       <Radio.Button value='bottomRight'>BottomRight</Radio.Button>
//       <Radio.Button value='none'>None</Radio.Button>
//     </Radio.Group>
//   </Form.Item>
// </Form> */
// }

// const [bordered, setBordered] = useState(false);
// const [loading, setLoading] = useState(true);
// const [size, setSize] = useState("large");
// const [expandable, setExpandable] = useState(defaultExpandable);
// const [showTitle, setShowTitle] = useState(false);
// const [showHeader, setShowHeader] = useState(true);
// const [showFooter, setShowFooter] = useState(true);
// const [rowSelection, setRowSelection] = useState({});
// const [hasData, setHasData] = useState(true);
// const [tableLayout, setTableLayout] = useState(undefined);
// const [top, setTop] = useState("none");
// const [bottom, setBottom] = useState("bottomRight");
// const [ellipsis, setEllipsis] = useState(false);
// const [yScroll, setYScroll] = useState(false);
// const [xScroll, setXScroll] = useState(undefined);

// const handleBorderChange = (enable) => {
//   setBordered(enable);
// };
// const handleLoadingChange = (enable) => {
//   setLoading(enable);
// };
// const handleSizeChange = (e) => {
//   setSize(e.target.value);
// };
// const handleTableLayoutChange = (e) => {
//   setTableLayout(e.target.value);
// };
// const handleExpandChange = (enable) => {
//   setExpandable(enable ? defaultExpandable : undefined);
// };
// const handleEllipsisChange = (enable) => {
//   setEllipsis(enable);
// };
// const handleTitleChange = (enable) => {
//   setShowTitle(enable);
// };
// const handleHeaderChange = (enable) => {
//   setShowHeader(enable);
// };
// const handleFooterChange = (enable) => {
//   setShowFooter(enable);
// };
// const handleRowSelectionChange = (enable) => {
//   setRowSelection(enable ? {} : undefined);
// };
// const handleYScrollChange = (enable) => {
//   setYScroll(enable);
// };
// const handleXScrollChange = (e) => {
//   setXScroll(e.target.value);
// };
// const handleDataChange = (newHasData) => {
//   setHasData(newHasData);
// };
// const scroll = {};
// if (yScroll) {
//   scroll.y = 240;
// }
// if (xScroll) {
//   scroll.x = "100vw";
// }
// const tableColumns = columns.map((item) => ({
//   ...item,
//   ellipsis,
// }));
// if (xScroll === "fixed") {
//   tableColumns[0].fixed = true;
//   tableColumns[tableColumns.length - 1].fixed = "right";
// }
// const tableProps = {
//   bordered,
//   loading,
//   size,
//   expandable,
//   title: showTitle ? defaultTitle : undefined,
//   showHeader,
//   footer: showFooter ? defaultFooter : undefined,
//   rowSelection,
//   scroll,
//   tableLayout,
// };

// {
//   "id": "rec01Q5EGjRe5q9Fz",
//   "data": {
//     "Pre-employment Drug Test": "2022-08-16",
//     "Master Driver A": ["recHNb7mIHtCRlo0L", "reczzO5EyIVuMHokQ"],
//     "DOB": "1965-12-05",
//     "Master  Driver B": [
//       "recvMzuahUZrpVVIS",
//       "recfWKp1Fq1JIGxet",
//       "recxezmjLkZxAXpi2",
//       "rec8Jbrovea6gXhIN",
//       "recDu36NtzJ4a1QAa",
//       "recFL1yHgaM7PEg3c",
//       "recIDBxLkTvHwvurS"
//     ],
//     "Driver A Lates": 0,
//     "Emails1": "jamam4291@gmail.com",
//     "Record ID": "recS4zzv9B8w9VCOO",
//     "State": "WA",
//     "Driver B Collect": 20026.82,
//     "for": "https://airtable.com/appTAdSTyVQUZeoDG/tbl2SUbQuiifYw6Ed/recS4zzv9B8w9VCOO",
//     "Bank": "Chase bank",
//     "Total Money Generated": 23006.14,
//     "Medical #": "5090023944",
//     "Status": "Alpha Lion ",
//     "Routing": "325070760",
//     "Total Loads Delivered": 8,
//     "Driver Reimburse amount": 0,
//     "Drive Date": "2022-09-11",
//     "Medical": [
//       {
//         "width": 967,
//         "url": "https://dl.airtable.com/.attachments/dec9372972d30d988d680c4bc0b95689/7ecc995a/jamamedi.jpeg",
//         "filename": "jama medi.jpeg",
//         "height": 578,
//         "type": "image/jpeg",
//         "size": 115612,
//         "thumbnails": {
//           "small": {
//             "height": 36,
//             "url": "https://dl.airtable.com/.attachmentThumbnails/65a21c6bbb5adb05183c3c0b862e2517/5a2147cb",
//             "width": 60
//           },
//           "full": {
//             "width": 3000,
//             "height": 3000,
//             "url": "https://dl.airtable.com/.attachmentThumbnails/cb19fd16ec7f88691fed1e66566a50f4/c5ddfd72"
//           },
//           "large": {
//             "height": 512,
//             "width": 857,
//             "url": "https://dl.airtable.com/.attachmentThumbnails/b3850baaadb89ed46e5aba2bca67776a/af6de894"
//           }
//         },
//         "id": "atthlo18XTlw0f2IO"
//       }
//     ],
//     "License EXP": "2026-12-05",
//     "Phone": "(206) 601-6178",
//     "Med": [
//       {
//         "filename": "Screenshot 2022-09-06 091637.pdf",
//         "id": "attvhtCV3P8GVRXRh",
//         "size": 130810,
//         "url": "https://dl.airtable.com/.attachments/ea61c5e608efd029ed699e4a5c3ca0c1/bab0cb93/Screenshot2022-09-06091637.pdf",
//         "thumbnails": {
//           "small": {
//             "width": 51,
//             "url": "https://dl.airtable.com/.attachmentThumbnails/1673e829ff9d3149aabd3c0e0a71c1a7/84146045",
//             "height": 36
//           },
//           "large": {
//             "height": 362,
//             "width": 512,
//             "url": "https://dl.airtable.com/.attachmentThumbnails/1dc9bd133d9cfa8ddf480fd739eaa2e2/f263aa55"
//           }
//         },
//         "type": "application/pdf"
//       }
//     ],
//     "Account": "800376928",
//     "SSN": "507-97-9326",
//     "Driver PayChecks": "9/16/2022, 9/30/2022, 10/28/2022, 11/4/2022",
//     "Application": [
//       {
//         "size": 10191,
//         "id": "attD1dRcKfEyvTcLG",
//         "thumbnails": {
//           "large": {
//             "height": 512,
//             "url": "https://dl.airtable.com/.attachmentThumbnails/28b731c46d58b667e44b9400b508b0ad/d9c74fcc",
//             "width": 385
//           },
//           "small": {
//             "width": 27,
//             "url": "https://dl.airtable.com/.attachmentThumbnails/efebafa0c31a5c53664136fb45f8690c/5a92f3e9",
//             "height": 36
//           }
//         },
//         "type": "application/pdf",
//         "url": "https://dl.airtable.com/.attachments/d40648f7d4d087bc3b5284497b43f503/ca1799b9/Jama_Mohamed_1763706341.pdf",
//         "filename": "Jama_Mohamed_176370634 (1).pdf"
//       }
//     ],
//     "Driver A Loads Delivered ": 1,
//     "Name": "Jama Ishack Mohamed ",
//     "DL #": "WDL13R7D003B",
//     "Medical EXP": "2024-05-05",
//     "Driver A Collect": 2979.32,
//     "Account Type": "Checking",
//     "Driver B Loads Delivered": 7,
//     "newField": 3,
//     "MVR": [
//       {
//         "url": "https://dl.airtable.com/.attachments/5f2544412442f47825a956dbe826fc9d/8b08fff2/MOHAMED_ISHACK_472504321.pdf",
//         "filename": "MOHAMED_ISHACK_47250432 (1).pdf",
//         "size": 153177,
//         "id": "attPuCGGGZqlHuIlN",
//         "type": "application/pdf",
//         "thumbnails": {
//           "large": {
//             "width": 396,
//             "height": 512,
//             "url": "https://dl.airtable.com/.attachmentThumbnails/b05c49bbf951d9f24a80f95290152d37/4dc99368"
//           },
//           "small": {
//             "height": 36,
//             "width": 28,
//             "url": "https://dl.airtable.com/.attachmentThumbnails/f051199893a1364d0416b343653d7d6f/7bce4fcb"
//           }
//         }
//       }
//     ],
//     "Custody / DOT Results": [
//       {
//         "type": "application/pdf",
//         "url": "https://dl.airtable.com/.attachments/47f29ca129c3dd2a950702c1e11d60e1/1411128f/JAMA_MOHAMED_473089661.pdf",
//         "size": 132175,
//         "filename": "JAMA_MOHAMED_47308966 (1).pdf",
//         "id": "att8GeGpKPlDLjfZZ",
//         "thumbnails": {
//           "small": {
//             "height": 36,
//             "width": 28,
//             "url": "https://dl.airtable.com/.attachmentThumbnails/f0e7d0ffe40f44e4d12551be6ab08599/e0e7d9ce"
//           },
//           "large": {
//             "height": 512,
//             "url": "https://dl.airtable.com/.attachmentThumbnails/f807aca18db8581f8c8152a4e5edfcfd/adaea0f1",
//             "width": 396
//           }
//         }
//       }
//     ],
//     "Number of Reimbursements ": 0,
//     "1099/W-2": "1099",
//     "Driver A On Time": 1,
//     "Address": "24512 108TH AVE SE, KENT, WA 98030-4904",
//     "DL": [
//       {
//         "thumbnails": {
//           "full": {
//             "width": 3000,
//             "url": "https://dl.airtable.com/.attachmentThumbnails/b02d8185e87270c2fa43232122ba78a1/ef0b64f9",
//             "height": 3000
//           },
//           "small": {
//             "height": 36,
//             "url": "https://dl.airtable.com/.attachmentThumbnails/d3604a573413677cde5e3bb5759f3b64/217a61e8",
//             "width": 54
//           },
//           "large": {
//             "width": 761,
//             "height": 510,
//             "url": "https://dl.airtable.com/.attachmentThumbnails/5a38a2d9fedd7d501a86bddeb95f3ee1/36a26c43"
//           }
//         },
//         "width": 761,
//         "type": "image/jpeg",
//         "filename": "jama back.jpeg",
//         "id": "attE1MEoDtHhyPfRi",
//         "size": 67948,
//         "url": "https://dl.airtable.com/.attachments/c355989504a58f60e76fcfedc1583b77/396216bf/jamaback.jpeg",
//         "height": 510
//       },
//       {
//         "height": 608,
//         "width": 905,
//         "size": 81826,
//         "url": "https://dl.airtable.com/.attachments/7cba462e49d853761db50762b19154c8/4f39ce98/jama.jpeg",
//         "id": "attf04xR0VstdKfbQ",
//         "type": "image/jpeg",
//         "thumbnails": {
//           "small": {
//             "height": 36,
//             "width": 54,
//             "url": "https://dl.airtable.com/.attachmentThumbnails/b69f348e7e326c01e5fcf2136def82f2/81836d6b"
//           },
//           "full": {
//             "url": "https://dl.airtable.com/.attachmentThumbnails/03c0df90043fa9c32f21f4cc9fcc815f/2c31ecf8",
//             "height": 3000,
//             "width": 3000
//           },
//           "large": {
//             "width": 762,
//             "height": 512,
//             "url": "https://dl.airtable.com/.attachmentThumbnails/58236d1947f02dcfffac4539725fca03/e7aec4c3"
//           }
//         },
//         "filename": "jama.jpeg"
//       }
//     ],
//     "Drug Test Verified": "2022-08-17"
//   }
// },

// export default function Drivers() {
// const { data, error, isFetching } = useGetDriversQuery();

// if (error) <Error />;
// if (isFetching) return <Loading />;

//   console.log(data);

//   return (
//     <div className='overflow-scroll break-all w-screen h-full'>
//       {JSON.stringify(data)}
//     </div>
//   );
// }
