import { SidebarLayout } from "@/components/Layout/SidebarLayout";
import { AdminSidebar } from "@/components/Sidebar/AdminSidebar";
import React, { useEffect, useState } from "react";
import { BrandApi } from "@/services/api/brand";
import { IBrandModel } from "@/services/interfaces/common";
import { styled } from '@mui/system';
import {
  TablePagination,
  tablePaginationClasses as classes,
} from '@mui/base/TablePagination';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';

type Props = {};

const Brands = (props: Props) => {
  return (
    <SidebarLayout
      MainComponent={<Main />}
      SidebarComponent={<AdminSidebar />}
    />
  );
};

const Main = (props: Props) => {
  const [brands, setBrands] = useState<IBrandModel[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const getData = async () => {
    BrandApi.list()
      .then((res) => {
        console.log(res.data);
        setBrands(res.data);
      })
      .catch((err) => {
        alert(JSON.stringify(err));
      })
  }
  useEffect(() => {
    getData();
  }, []);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - brands.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Root sx={{ maxWidth: '100%', width: 500 }}>
      <table aria-label="custom pagination table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Slug</th>
            <th>State</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {(rowsPerPage > 0
            ? brands.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : brands
            ).map((row) => (
              <tr key={row._id}>
              <td>{row.name}</td>
              <td>{row.slug}</td>
              <td>{row.state}</td>
              <td>
                <IconButton onClick={() => console.log(row.name)} aria-label="edit">
                  <EditIcon />
                </IconButton>
              </td>
            </tr>

            )
            )}
          {emptyRows > 0 && (
            <tr style={{ height: 41 * emptyRows }}>
              <td colSpan={Object.keys(brands[0]).length + 1} aria-hidden />
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <CustomTablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={4}
              count={brands.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  'aria-label': 'rows per page',
                },
                actions: {
                  showFirstButton: true,
                  showLastButton: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </tr>
        </tfoot>
      </table>
    </Root>
  );
}

const grey = {
  200: '#DAE2ED',
  800: '#303740',
  900: '#1C2025',
};

const Root = styled('div')(
  ({ theme }) => `
  table {
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    border-collapse: collapse;
    width: 100%;
  }
  td,
  th {
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    text-align: left;
    padding: 8px;
  }
  th {
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  }
  `,
);

const CustomTablePagination = styled(TablePagination)`
  & .${classes.toolbar} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }
  & .${classes.selectLabel} {
    margin: 0;
  }
  & .${classes.displayedRows} {
    margin: 0;
    @media (min-width: 768px) {
      margin-left: auto;
    }
  }
  & .${classes.spacer} {
    display: none;
  }
  & .${classes.actions} {
    display: flex;
    gap: 0.25rem;
  }
`;

export default Brands;
