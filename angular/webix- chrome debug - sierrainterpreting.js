/*
 Probar webix desde la consola de chrome. En este caso queremos auto ajustar la coluna de  translatorTypes   usar adjustRowHeight y eb la configuración de la tabla  fixedRowHeight: false
 */

//En la consola de chrome
var scope= angular.element(document.getElementById('opportunitiesDatatable')).scope()
scope.opportunitiesDatatable.adjustRowHeight("translatorTypes");

//En el controller 
  //WEBIX TABLE BEGIN
                var opportunitiesDatatable = new webix.ui({
                    container: "opportunitiesDatatable",
                    view: "datatable",
                    columns: [
                        {
                            id: "id"
                            },
                        {
                            id: "region",
                            header: ["Region", {
                                content: "selectFilter"
                                    }],
                            sort: "string",
                            width: 200
                        },
                        {
                            id: "region_name",
                            header: ["Region", {
                                content: "selectFilter"
                                    }],
                            sort: "string",
                            width: 200
                        },
                        {
                            id: "translatorTypes",
                            header: ["Translator Types", {
                                content: "textFilter"
                                }],
                            sort: "string",
                            width: 150
                        },
                        {
                            id: "interpreter",
                            header: ["Interpreter", {
                                content: "textFilter"
                                    }],
                            sort: "string",
                            width: 200
                        }, {
                            id: "client",
                            header: ["Client", {
                                content: "textFilter"
                                }],
                            sort: "string",
                            width: 250

                        }, {
                            id: "status",
                            header: ["Status", {
                                content: "selectFilter"
                                }],
                            sort: "string"
                        }, {
                            id: "type",
                            header: ["Type", {
                                content: "selectFilter"
                                }],
                            sort: "string"
                        }, {
                            id: "date",
                            header: ["Date", {
                                content: "selectFilter"
                                }],
                            sort: "string"
                        }, {
                            id: "time",
                            header: ["Time", {
                                content: "selectFilter"
                                }],
                            sort: "string",
                            width: 150
                        }, {
                            id: "location",
                            header: ["Location", {
                                content: "textFilter"
                                }],
                            sort: "string",
                            width: 150
                        },
                        {
                            id: "location_phone",
                            header: ["Location_Phone", {
                                content: "textFilter"
                                }],
                            sort: "string",
                            width: 150
                        },
                        {
                            id: "adress",
                            header: ["Adress", {
                                content: "textFilter"
                                }],
                            sort: "string",
                            width: 300
                        },
                        {
                            id: "notifications",
                            header: "Notification",
                            sort: "string"
                        }
                    ],
                    export: true,
                    data: vm.opportunity_list,
                    on: {
                        onMouseMoving: function (ev) {
                            var id = this.locate(ev);
                            if (id != this.last_used_id)
                                this.removeRowCss(this.last_used_id, "hover");
                            this.addRowCss(id, "hover");
                            this.last_used_id = id;
                        }
                    },
                    onMouseMove: {},
                    autoheight: false,
                    height: 500,
                    autowidth: false,
                    width: 1200,
                    scroll: "xy",
                    size: 10,
                    fixedRowHeight: false,
                    group: 5
                });

                //Order by date  desc
                opportunitiesDatatable.sort("#date#", "desc", "string");
                opportunitiesDatatable.markSorting("date", "desc");
                //hide columns
                opportunitiesDatatable.hideColumn("id");
                opportunitiesDatatable.hideColumn("status");
                opportunitiesDatatable.hideColumn("region");
                opportunitiesDatatable.hideColumn("interpreter");
                opportunitiesDatatable.hideColumn("notifications");
                opportunitiesDatatable.adjustRowHeight("translatorTypes");

                //WEBIX TABLE END