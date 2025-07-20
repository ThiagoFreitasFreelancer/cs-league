(function () {
  'use strict';

  angular
    .module('leagueApp')
    .controller('LeagueTeamsTableController', LeagueTeamsTableController);

  LeagueTeamsTableController.$inject = ['TeamService', '$uibModal', 'toastr'];

  function LeagueTeamsTableController(TeamService, $uibModal, toastr) {
    var vm = this;
    vm.teams = [];
    vm.isLoading = false;

    vm.gridOptions = {
      paginationPageSizes: [10, 25, 50],
      paginationPageSize: 10,
      enableFiltering: true,
      enableSorting: true,
      columnDefs: [
        { field: 'position', displayName: 'Posição', width: '10%', enableFiltering: false, sort: { direction: 'asc', priority: 0 } },
        {
          field: 'logoUrl', displayName: 'Logo', width: '8%', enableFiltering: false, enableSorting: false,
          cellTemplate: '<div class="ui-grid-cell-contents"><img ng-if="row.entity.logoUrl" ng-src="{{row.entity.logoUrl}}" alt="Logo" class="team-logo-small" /></div>'
        },
        { field: 'name', displayName: 'Nome da Equipe', width: '25%' },
        { field: 'wins', displayName: 'Vitórias', width: '10%' },
        { field: 'losses', displayName: 'Derrotas', width: '10%' },
        { field: 'points', displayName: 'Pontos', width: '10%' },
        {
          name: 'actions', displayName: 'Ações', enableFiltering: false, enableSorting: false, width: '17%',
          cellTemplate: `
            <div class="ui-grid-cell-contents">
              <button class="btn btn-sm btn-warning" ng-click="grid.appScope.vm.openEditTeamModal(row.entity)">
                <i class="fas fa-edit"></i> Editar
              </button>
              <button class="btn btn-sm btn-danger" ng-click="grid.appScope.vm.confirmRemoveTeam(row.entity)">
                <i class="fas fa-trash-alt"></i> Remover
              </button>
            </div>`
        }
      ],
      onRegisterApi: function (gridApi) {
        vm.gridApi = gridApi;
      }
    };

    vm.$onInit = function () {
      vm.loadTeams();
    };

    vm.loadTeams = function () {
      vm.isLoading = true;
      TeamService.getTeams()
        .then(function (response) {
          vm.teams = response.data.sort(function(a, b) {
            if (b.points !== a.points) return b.points - a.points;
            return b.wins - a.wins;
          }).map(function(team, index) {
            team.position = index + 1;
            return team;
          });
          vm.gridOptions.data = vm.teams;
        })
        .catch(function () {
          toastr.error('Erro ao carregar equipes.', 'Erro!');
        })
        .finally(function () {
          vm.isLoading = false;
        });
    };

    vm.openAddTeamModal = function () {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'views/modals/add-edit-team-modal.html',
        controller: 'AddEditTeamModalController',
        controllerAs: 'modalVm',
        resolve: { team: function () { return null; } }
      });

      modalInstance.result.then(function () {
        vm.loadTeams();
        toastr.success('Equipe adicionada com sucesso!', 'Sucesso!');
      });
    };

    vm.openEditTeamModal = function (team) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'views/modals/add-edit-team-modal.html',
        controller: 'AddEditTeamModalController',
        controllerAs: 'modalVm',
        resolve: { team: function () { return angular.copy(team); } }
      });

      modalInstance.result.then(function () {
        vm.loadTeams();
        toastr.info('Equipe atualizada com sucesso!', 'Sucesso!');
      });
    };

    vm.confirmRemoveTeam = function (team) {
      if (confirm('Tem certeza que deseja remover a equipe ' + team.name + '?')) {
        TeamService.deleteTeam(team.id)
          .then(function () {
            vm.loadTeams();
            toastr.success('Equipe removida com sucesso!', 'Sucesso!');
          })
          .catch(function () {
            toastr.error('Erro ao remover equipe.', 'Erro!');
          });
      }
    };

    vm.$onInit();
  }
})();
