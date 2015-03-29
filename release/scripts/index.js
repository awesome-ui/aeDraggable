(function (angular) {



    angular.module('bDraggable', [])

        .constant('bDraggableConfig', {
            draggingClassname: '_dragging',
            draggingEnterClassname: '_dragging-enter',
        })

        .directive('bDraggable', bDraggableDirective)

    ;



    function bDraggableDirective(bDraggableConfig) {
        return {
            restrict: 'A',

            link: function ($scope, $e, $a) {
                $a.$set('draggable', true)

                var type= $a.bDraggable

                $e.on('dragstart', function (evt) {
                    $e.addClass(bDraggableConfig.draggingClassname)
                    setTransferData(evt.dataTransfer, type, $scope.$eval($a.draggableDrag))
                })

                $e.on('dragenter', function (evt) {
                    if (!isIe() && hasTransferData(evt.dataTransfer, type)) {
                        $e.addClass(bDraggableConfig.draggingEnterClassname)
                    }
                    evt.stopPropagation()
                    evt.preventDefault()
                })

                $e.on('dragover', function (evt) {
                    if (!isIe() && hasTransferData(evt.dataTransfer, type)) {
                        $e.addClass(bDraggableConfig.draggingEnterClassname)
                    }
                    evt.stopPropagation()
                    evt.preventDefault()
                })

                $e.on('dragleave', function (evt) {
                    $e.removeClass(bDraggableConfig.draggingEnterClassname)
                })

                $e.on('dragend', function (evt) {
                    $e.removeClass(bDraggableConfig.draggingClassname)
                })

                $e.on('drop', function (evt) {
                    $e.removeClass(bDraggableConfig.draggingClassname)
                    $e.removeClass(bDraggableConfig.draggingEnterClassname)
                    if (hasTransferData(evt.dataTransfer, type)) {
                        $scope.$apply(function () {
                            $scope.$eval($a.draggableDrop, {
                                $data: getTransferData(evt.dataTransfer, type)
                            })
                        })
                    }
                })

                function setTransferData(transfer, type, data) {
                    if (isIe()) { // bldjad
                        data= JSON.stringify({
                            type: type,
                            data: data,
                        })
                        transfer.setData('text', data)
                    } else {
                        data= '' + data
                        transfer.setData(type, data)
                    }
                }

                function hasTransferData(transfer, type) {
                    if (isIe()) { // bldjad
                        try {
                            var data= JSON.parse(transfer.getData('text'))
                            if (data && data.type == type) {
                                return true
                            }
                        } catch (err) {}
                    } else {
                        for (var i= 0; i < transfer.types.length; ++i) {
                            if (transfer.types[i] === type) return true
                        }
                        return false
                    }
                }

                function getTransferData(transfer, type) {
                    if (isIe()) { // bldjad
                        try {
                            var data= JSON.parse(transfer.getData('text'))
                            if (data && data.type == type) {
                                return data.data
                            }
                        } catch (err) {}
                    } else {
                        return transfer.getData(type)
                    }
                }

            }

        }
    }



    function isIe() {
        if (navigator.appVersion.indexOf('MSIE 10') !== -1) {
            return true
        }
        if (navigator.userAgent.indexOf('Trident') !== -1 && navigator.userAgent.indexOf('rv:11') !== -1) {
            return true
        }
        return false
    }



})(angular)
