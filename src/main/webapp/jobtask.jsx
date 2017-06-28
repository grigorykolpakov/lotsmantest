var emps = [
    {id: "7", name: "Jhon", department: "01"},
];


var emps1 = [
    {id: "7", name: "Jhon", department: "01"},
    {id: "1", name: "Lionel", department: "01"},
    {id: "2", name: "Milan", department: "02"},
    {id: "3", name: "Max", department: "02"},
];

function Employee(id, name, department) {
    this.id = id;
    this.name = name;
    this.department = department;
}

var MyDataFunc = {
    loadData1: function (data1) {
        console.log("loadData1" + data1);
        emps = data1;
    }
};
var MyCommonFunc = {
    myDeleteRowById: function (idRow) {
        console.log("delete id= " + idRow);
        //alert('dosomething');
    },
    // updateRowById: function (idRow) {
    //     console.log("update id= " + idRow);
    // },
    //
};

var ButtonDel = React.createClass({
    mixins: [MyCommonFunc],
    propTypes: {
        id: React.PropTypes.string,
    },
    localHandleClick: function () {
        console.log('Button Del was clicked!');
        deleteRow( this.props.id );
    },
    render: function () {
        return (
            <button onClick={this.localHandleClick}>Delete Row</button>
        )
    }
});

var ButtonUpdateRow = React.createClass({
   // mixins: [MyCommonFunc],
    propTypes: {
        id: React.PropTypes.string.isRequired,
        getVal: React.PropTypes.func,
    },
    localHandleClick: function () {
        console.log('Button Update was clicked!');
        var res = this.props.getVal();
        console.log("res = " + res);
    },
    render: function () {
        return (
            <button onClick={this.localHandleClick}>Update Row</button>
        )
    }
});

var ButtonAdd = React.createClass({
    mixins: [MyCommonFunc],
    propTypes: {
        id: React.PropTypes.string,
        addFun: React.PropTypes.func,
    },
    localHandleClick: function () {
        console.log('Button Add was clicked!');
        this.props.addFun();
    },
    render: function () {
        return (
            <button onClick={this.localHandleClick}>Add Row</button>
        )
    }
});
var ButtonUpdateTbl = React.createClass({
    propTypes: {
        id: React.PropTypes.string,
    },
    localHandleClick: function () {
        console.log('Button ButtonUpdateTbl was clicked!');
        updateAllData();
    },
    render: function () {
        return (
            <button onClick={this.localHandleClick}> Update Tbl</button>
        )
    }
});

var OneRow = React.createClass({
    propTypes: {
        data7: React.PropTypes.object,
     //   idRow: React.PropTypes.string,
        //  removeFuncRow: React.PropTypes.func,
    },
    getInitialState: function () {
        return {
            objComp: {},
        };
    },
    setVal: function (val, nameProp) {
        this.state.objComp[nameProp] = val;
    },
    getObject: function () {
        console.log('getObject!!!!!!');
       var sObjJson = JSON.stringify( this.state.objComp);
       console.log("sObjJson = " + sObjJson);
       addRowJson(sObjJson);
    },
    render: function () {
              var idComp= <DataStringConst srcValue={this.props.data7.id}
                                                  nameProp={"id"} setVal={this.setVal}/>;
              var nameComp= <DataString srcValue={this.props.data7.name}
                                                    nameProp={"name"}  setVal={this.setVal}/>;
              var departmentComp = <DataString srcValue={this.props.data7.department}
                                                          nameProp={"department"}  setVal={this.setVal}/>;
              return (
                  <tr className="mytbl">
                      <td className="mytbl">{idComp}</td>
                      <td className="mytbl">{nameComp}</td>
                      <td className="mytbl">{departmentComp}</td>
                      <td><ButtonDel id={this.props.data7.id}/></td>
                      <td><ButtonUpdateRow id={this.props.data7.id} getVal={this.getObject}  /></td>
                  </tr>
              )
    }
});

var OneTable = React.createClass({
    mixins: [MyDataFunc],
    propTypes: {
        rowsAll: React.PropTypes.array,
    },
    // statics: {
    //     setRows: function (dd) {
    //         console.log("static setRows \n" + dd);
    //         this.setRowsLocal(dd);
    //         //this.state.rows=dd;
    //     }
    // },
    updateRowById: function (id) {
        var rowFilteredById = this.state.rows.filter((p1, p2, p3) => p1==id);
        console.log("!!!!!!!! rowFilteredById= " + rowFilteredById);
    },
    addEmptyRow: function () {
        //var sData =  JSON.stringify(this.state.rows);
        var oData = this.state.rows;
        console.log("!!!!!!!! oData= " + oData);
        var d = new Date();
        var sn = d.getTime() + "";
        oData.push({id: sn, name: "-", department: "-"});
        this.setState({rows: oData});
    },
    setRowsLocal: function (dd) {
        console.log("!!this.state.rows= " + this.state.rows);
        console.log("static setRowsLocal \n" + dd);
        this.setState({rows: eval(dd)});
        console.log("!!this.state.rows= " + this.state.rows);
    },
    getInitialState: function () {
        return {
            rows: [],
        };
    },
    updateAlldata: function () {
        console.log('updateAlldata', arguments);
        //  updateAllData();
        axios.get('/empls')
            .then(function (response) {
                console.log(response.data);
                //  this.setState({rows: eval(response.data)})
                setDataVals(response.data);

            })
            .catch(function (error) {
                console.log(error);
            });
    },

    componentWillMount: function () {
        console.log('componentWillMount', arguments);
        this.updateAlldata();
    },

    render: function () {

        var rows = this.state.rows.map(function (a) {
            return <OneRow data7={a} key={a.id}/>;
        });
        console.log("render!!!");
        var tbl = <table>
            <thead>
            <tr>
                <th>id</th>
                <th>name</th>
                <th>department</th>
                <th><ButtonAdd addFun={this.addEmptyRow}/></th>
                <th><ButtonUpdateTbl/></th>

            </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>;
        return (
            <div>
                {tbl}
            </div>
        );
    }
});
/////////

var DataStringConst = React.createClass({
    propTypes: {
        srcValue: React.PropTypes.string.isRequired,
        nameProp: React.PropTypes.string.isRequired,
        setVal: React.PropTypes.func,
    },
    getValue: function () {
        console.log("static setRows \n" + this.state.name);
        return this.getVal();
    },
    getInitialState() {
        return (
            {
                name: '-',
            }
        );
    },
    setPropToObj: function(obj){
        obj[this.props.nameProp] = this.state.name
    },
    componentDidMount: function () {
        this.setState({name: this.props.srcValue});
        this.props.setVal(this.props.srcValue, this.props.nameProp);
    },

    render() {
        return (
            <b>{this.props.srcValue}</b>
        );
    }
});


//////
var DataString = React.createClass({
    propTypes: {
        srcValue: React.PropTypes.string.isRequired,
        nameProp: React.PropTypes.string.isRequired,
        setVal: React.PropTypes.func,
    },
    getValue: function () {
        console.log("static setRows \n" + this.state.name);
        return this.getVal();
    },
    getInitialState() {
        return (
            {
                name: '-',
                bEdit: false,
                bUpdated: false,
            }
        );
    },
    setPropToObj: function(obj){
        obj[this.props.nameProp] = this.state.name
    },
    componentDidMount: function () {
        this.setState({name: this.props.srcValue});
        this.props.setVal(this.props.srcValue, this.props.nameProp);
    },
    handleChange(event) {
        this.setState({name: event.target.value});
        this.props.setVal(event.target.value, this.props.nameProp);
        this.setState({bUpdated: true });
        return true;
    },
    handleDblClick1(event) {
        console.log('handleDblClick1 ', event);
        var flag = !this.state.bEdit;
        this.setState({bEdit: flag });
    },
    render() {
        var comp = <input type="text"
                          value={this.state.name}
                          onChange={this.handleChange} onDoubleClick={this.handleDblClick1}/>;
        if (!this.state.bEdit) {
            if(this.state.bUpdated){
                comp = <b onDoubleClick={this.handleDblClick1}>{this.state.name}</b>;
            }else{
                comp = <b onDoubleClick={this.handleDblClick1}>{this.props.srcValue}</b>;
            }

        }
        return (
            comp
        );
    }
});
// var oneTbl = React.renderComponent(OneTable);

/////////////////////////////////////
//  <Onerow1 lidata={headers1} /> 
//           <Onerow1 lidata={headers2} />
//

var oneTbl = ReactDOM.render(
    <OneTable rowsAll={emps}/>

    ,
    document.getElementById("app")
);

var updateAllData = function () {
    console.log('updateAllData', arguments);
    axios.get('/empls')
        .then(function (response) {
            console.log(response.data);
            //  this.setState({rows: eval(response.data)})
            setDataVals(response.data);

        })
        .catch(function (error) {
            console.log(error);
        });
};

var setDataVals = function (dd) {
    console.log("setDataVals!!!!!!!!!!!1" + dd);
    oneTbl.setRowsLocal(dd);
};

var updateOnServer = function (jsonStr) {
    console.log("!!!!!!!!!!!!!updateOnServer!!!!!!!!!!!\n" + jsonStr);
};

var deleteRow = function (id) {
        axios.get('/delete?id='+id)
            .then(function (response) {
                console.log(response.data);
            updateAllData();
            })
            .catch(function (error) {
                console.log(error);
            });
        };

var addRowJson = function (dataJson) {
 axios.post(
          '/add',
           dataJson ,
          { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        ).then(function (response) {
                                  console.log(response.data);
                                 updateAllData();
                                 })
                                 .catch(function (error) {
                                     console.log(error);
                                 });
                    };

