// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0;

interface ItestDEXMigrator {
    function migrate(
        address token,
        uint256 amountTokenMin,
        uint256 amountETHMin,
        address to,
        uint256 deadline
    ) external;
}
